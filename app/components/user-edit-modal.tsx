'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { getSessionToken } from '@descope/react-sdk'

interface User {
  id: string
  name: string
  email: string
}

interface UserEditModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
  onUserUpdated: () => void
}

export function UserEditModal({ isOpen, onClose, user, onUserUpdated }: UserEditModalProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const updateUser = async (userId: string, userData: { name: string; email: string }) => {
    const token = getSessionToken();
    await axios.put(`${process.env.NEXT_PUBLIC_AWS_URL}/users/${userId}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateUser(user.id, { name, email })
    onUserUpdated()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

