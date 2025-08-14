"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, Database, Shield } from "lucide-react";

const AdminPanelPage = () => {
  return (
    <div className="px-4">
      <div className="border-2 border-secondary h-full w-full rounded-xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage system settings and configurations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold">System Settings</h3>
            </div>
            <p className="text-gray-600 mb-4">Configure general system settings and preferences</p>
            <Button className="w-full">Manage Settings</Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold">User Management</h3>
            </div>
            <p className="text-gray-600 mb-4">Add, edit, or remove user accounts and permissions</p>
            <Button className="w-full">Manage Users</Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold">Database</h3>
            </div>
            <p className="text-gray-600 mb-4">Backup, restore, and maintain database integrity</p>
            <Button className="w-full">Database Tools</Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold">Security</h3>
            </div>
            <p className="text-gray-600 mb-4">Configure security settings and access controls</p>
            <Button className="w-full">Security Settings</Button>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Export Data</Button>
              <Button variant="outline">Import Data</Button>
              <Button variant="outline">System Logs</Button>
              <Button variant="outline">Performance Monitor</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
