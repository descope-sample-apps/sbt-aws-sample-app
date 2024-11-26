/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserEditModal } from "./user-edit-modal";
import axios from "axios";
import { getSessionToken } from "@descope/react-sdk";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  roleNames: string[];
  userTenants: string[];
  status: string;
  picture: string;
  loginIds: string[];
}

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUsers = useCallback(async () => {
    const token = getSessionToken();
    console.log(token);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_AWS_URL}/users`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("API Response:", response);

    const usersData = response.data.data.users.map((user: any) => ({
      id: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      verifiedEmail: user.verifiedEmail,
      verifiedPhone: user.verifiedPhone,
      roleNames: user.roleNames,
      userTenants: user.userTenants,
      status: user.status,
      picture: user.picture,
      loginIds: user.loginIds,
    }));
    return usersData;
  }, []);

  const loadUsers = useCallback(async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  }, [fetchUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const deleteUser = useCallback(
    async (userId: string) => {
      const token = getSessionToken();
      await axios.delete(`${process.env.NEXT_PUBLIC_AWS_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadUsers();
    },
    [loadUsers]
  );

  // const handleEditUser = (user: User) => {
  //   setCurrentUser(user);
  //   setIsEditModalOpen(true);
  // };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
  };

  const handleUserUpdated = () => {
    setIsEditModalOpen(false);
    loadUsers();
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {/* <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => handleEditUser(user)}
                >
                  Edit
                </Button> */}
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteUser(user.loginIds[0])}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {currentUser && (
        <UserEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={currentUser}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </div>
  );
}
