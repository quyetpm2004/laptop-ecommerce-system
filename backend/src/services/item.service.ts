import { User } from "@prisma/client";
import { prisma } from "config/client";

const handleGetAllProducts = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    skip: skip,
    take: pageSize,
  });
  return products;
};

const handleCountTotalProductClientPage = async (pageSize: number) => {
  const totalProduct = await prisma.product.count();

  return totalProduct;
};

const handleGetDetailProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });
  return product;
};

const handleAddProductToCart = async (
  quantity: number,
  productId: number,
  user: any
) => {
  // has card

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (cart) {
    // update
    // tăng số lượng sum của cart

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        sum: {
          increment: quantity,
        },
      },
    });

    // Tìm xem có cart detaiil cũ không
    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id,
      },
    });

    await prisma.cartDetail.upsert({
      where: {
        // sẽ update nếu tìm ra được cart detail
        // ngược lại sẽ tạo mới
        id: currentCartDetail?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        productId: productId,
        quantity: quantity,
        price: product.price,
        cartId: cart.id,
      },
    });
  } else {
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: [
            {
              productId: productId,
              quantity: quantity,
              price: product.price,
            },
          ],
        },
      },
    });
  }
};

const handleGetCartByUserID = async (id: number) => {
  const cart = await prisma.cart.findFirst({
    where: {
      userId: +id,
    },
  });
  return cart;
};

const handleGetCartDetail = async (id: number) => {
  const cartDetails = await prisma.cartDetail.findMany({
    select: {
      quantity: true,
      price: true,
      product: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const result = cartDetails.map((item) => ({
    name: item.product.name,
    image: item.product.image,
    price: item.price,
    quantity: item.quantity,
    total: item.price * item.quantity,
  }));

  return result;
};

const handleGetProductInCart = async (id: number) => {
  const cart = await prisma.cart.findFirst({
    where: {
      userId: +id,
    },
  });

  if (cart) {
    const cartDetails = await prisma.cartDetail.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        product: true,
      },
    });

    return cartDetails;
  }
  return [];
};

const handleDeleteCartDetail = async (
  id: number,
  sumCart: number,
  userId: number
) => {
  const cartDetail = await prisma.cartDetail.findUnique({
    where: {
      id,
    },
  });

  const quantity = cartDetail.quantity;

  await prisma.cartDetail.delete({
    where: {
      id: id,
    },
  });

  if (sumCart > 1) {
    await prisma.cart.update({
      data: {
        sum: {
          decrement: quantity,
        },
      },
      where: {
        userId: userId,
      },
    });
  } else {
    await prisma.cart.delete({
      where: {
        userId: userId,
      },
    });
  }
};

const updateCartDetailBeforeCheckout = async (
  data: { id: string; quantity: string }[],
  userId
) => {
  var newQuantity = 0;

  for (let i = 0; i < data.length; i++) {
    newQuantity += +data[i].quantity;
    await prisma.cartDetail.update({
      where: {
        id: +data[i].id,
      },
      data: {
        quantity: +data[i].quantity,
      },
    });
  }

  await prisma.cart.update({
    data: {
      sum: newQuantity,
    },
    where: {
      userId,
    },
  });
};

const handlePlaceOrder = async (
  userId: number,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: number
) => {
  // tạo transaction

  await prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: { userId },
      include: {
        cartDetails: true,
      },
    });
    if (cart) {
      // create order, order detail
      const dataDetails = cart?.cartDetails?.map((item) => ({
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      }));

      await tx.order.create({
        data: {
          receiverName,
          receiverAddress,
          receiverPhone,
          paymentMethod: "COD",
          paymentStatus: "PAYMENT_UNPAID",
          status: "PENDING",
          totalPrice,
          userId,
          orderDetails: {
            create: dataDetails,
          },
        },
      });

      // delete cart
      await tx.cartDetail.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await tx.cart.delete({
        where: {
          userId,
        },
      });

      // check product
      for (var i = 0; i < cart.cartDetails.length; i++) {
        const productId = cart.cartDetails[i].productId;
        const product = await tx.product.findUnique({
          where: { id: productId },
        });

        if (!product || product.quantity < cart.cartDetails[i].quantity) {
          throw new Error("Sản phẩm không tồn tại hoặc không đủ số lượng");
        }

        await tx.product.update({
          where: {
            id: productId,
          },
          data: {
            quantity: {
              decrement: cart.cartDetails[i].quantity,
            },
            sold: {
              increment: cart.cartDetails[i].quantity,
            },
          },
        });
      }
    }
  });
};

export {
  handleGetAllProducts,
  handleGetDetailProduct,
  handleAddProductToCart,
  handleGetCartByUserID,
  handleGetCartDetail,
  handleGetProductInCart,
  handleDeleteCartDetail,
  updateCartDetailBeforeCheckout,
  handlePlaceOrder,
  handleCountTotalProductClientPage,
};
