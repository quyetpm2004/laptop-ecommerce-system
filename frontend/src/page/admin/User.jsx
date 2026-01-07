import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserTable from "@/components/admin/UserTable";
import CreateUserModal from "@/components/admin/CreateUserModal";
import UpdateUserModal from "@/components/admin/UpdateUserModal";
import { Input } from "@/components/ui/input";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "@/service/user.api";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUser(searchName, page);
      if (res?.success) {
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      // Xử lý lỗi
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [searchName, page]);

  // Xử lý Edit
  const handleEditTrigger = (user) => {
    setEditingUser(user);
    setIsUpdateOpen(true);
  };

  // Xử lý Delete
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      // Xử lý lỗi
      console.error(err);
    }
  };

  // Xử lý tạo user
  const handleCreateUser = async (data) => {
    try {
      await createUser(data);
      setIsCreateOpen(false);
      fetchUsers();
    } catch (err) {
      // Xử lý lỗi
      console.error(err);
    }
  };

  // Xử lý cập nhật user
  const handleUpdateUser = async (updatedData) => {
    try {
      await updateUser(updatedData, editingUser?.id);
      setIsUpdateOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      // Xử lý lỗi
      console.error(err);
    }
  };

  // Xử lý tìm kiếm
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
    setPage(1);
  };

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl mb-4">Quản lý người dùng</h2>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Thêm người dùng
        </Button>
      </div>

      <div className="flex items-center max-w-sm relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm theo username..."
          className="pl-10"
          value={searchName}
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <UserTable
          users={users}
          onEdit={handleEditTrigger}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* Phân trang */}
        <div className="py-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(page - 1)}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href="#"
                    isActive={page === idx + 1}
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateUser}
      />

      <UpdateUserModal
        isOpen={isUpdateOpen}
        userData={editingUser}
        onClose={() => {
          setIsUpdateOpen(false);
          setEditingUser(null);
        }}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default User;
