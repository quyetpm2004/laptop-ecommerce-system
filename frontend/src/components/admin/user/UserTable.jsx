import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";

const UserTable = ({ users, onEdit, onDelete }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Fullname</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedUser(user)}
                >
                  <Eye className="w-4 h-4 text-blue-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(user)}
                >
                  <Edit className="w-4 h-4 text-amber-500" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(user.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Sheet xem chi tiết */}
      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
            <SheetDescription>Detail information of user.</SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <div className="py-6 px-4 space-y-4">
              <div>
                <span className="font-semibold">Full Name:</span>{" "}
                {selectedUser.fullName}
              </div>
              <div>
                <span className="font-semibold">Username:</span>{" "}
                {selectedUser.username}
              </div>
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {selectedUser.address}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedUser.phone}
              </div>
              <div>
                <span className="font-semibold">Role:</span>{" "}
                {selectedUser.roleId === 1 ? "Admin" : "User"}
              </div>
              <div>
                <span className="font-semibold">Avatar:</span>{" "}
                <img
                  className="mt-2 w-[40%]"
                  src={`${import.meta.env.VITE_BASE_URL_BACKEND}/images/${
                    selectedUser.avatar
                  }`}
                  alt="Avatar"
                />
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserTable;
