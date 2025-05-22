
import React from 'react';
import { TableWidget } from '@/components/TableWidget';
import { Table } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastActive: '2023-05-21' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active', lastActive: '2023-05-20' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', status: 'Inactive', lastActive: '2023-05-15' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active', lastActive: '2023-05-21' },
  { id: 5, name: 'Edward Norton', email: 'edward@example.com', role: 'User', status: 'Active', lastActive: '2023-05-19' },
  { id: 6, name: 'Fiona Apple', email: 'fiona@example.com', role: 'Editor', status: 'Active', lastActive: '2023-05-18' },
  { id: 7, name: 'George Clooney', email: 'george@example.com', role: 'User', status: 'Inactive', lastActive: '2023-05-10' },
  { id: 8, name: 'Hannah Montana', email: 'hannah@example.com', role: 'User', status: 'Active', lastActive: '2023-05-21' },
  { id: 9, name: 'Ian McKellen', email: 'ian@example.com', role: 'Admin', status: 'Active', lastActive: '2023-05-20' },
  { id: 10, name: 'Julia Roberts', email: 'julia@example.com', role: 'User', status: 'Active', lastActive: '2023-05-19' },
  { id: 11, name: 'Kevin Hart', email: 'kevin@example.com', role: 'Editor', status: 'Inactive', lastActive: '2023-05-14' },
  { id: 12, name: 'Laura Dern', email: 'laura@example.com', role: 'User', status: 'Active', lastActive: '2023-05-18' },
];

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

const mockProducts: Product[] = [
  { id: 101, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 45, rating: 4.7 },
  { id: 102, name: 'Smartphone X', category: 'Electronics', price: 899.99, stock: 120, rating: 4.5 },
  { id: 103, name: 'Desk Chair', category: 'Furniture', price: 249.99, stock: 30, rating: 4.2 },
  { id: 104, name: 'Coffee Maker', category: 'Appliances', price: 89.99, stock: 78, rating: 4.1 },
  { id: 105, name: 'Bluetooth Headphones', category: 'Electronics', price: 159.99, stock: 95, rating: 4.6 },
  { id: 106, name: 'Fitness Tracker', category: 'Wearables', price: 99.99, stock: 200, rating: 4.3 },
];

const Index = () => {
  const userColumns = [
    { id: 'id', header: 'ID', accessor: (user: User) => user.id },
    { id: 'name', header: 'Name', accessor: (user: User) => user.name },
    { id: 'email', header: 'Email', accessor: (user: User) => user.email },
    { id: 'role', header: 'Role', accessor: (user: User) => (
      <span 
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.role === 'Admin' 
            ? 'bg-purple-100 text-purple-800' 
            : user.role === 'Editor' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
        }`}
      >
        {user.role}
      </span>
    )},
    { id: 'status', header: 'Status', accessor: (user: User) => (
      <span 
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          user.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}
      >
        {user.status}
      </span>
    )},
    { id: 'lastActive', header: 'Last Active', accessor: (user: User) => user.lastActive }
  ];

  const productColumns = [
    { id: 'id', header: 'ID', accessor: (product: Product) => product.id },
    { id: 'name', header: 'Product Name', accessor: (product: Product) => product.name },
    { id: 'category', header: 'Category', accessor: (product: Product) => (
      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
        {product.category}
      </span>
    )},
    { id: 'price', header: 'Price', accessor: (product: Product) => (
      <span className="font-medium">${product.price.toFixed(2)}</span>
    )},
    { id: 'stock', header: 'In Stock', accessor: (product: Product) => product.stock },
    { id: 'rating', header: 'Rating', accessor: (product: Product) => (
      <div className="flex items-center">
        <span className="mr-1">{product.rating}</span>
        <div className="relative w-20 h-4">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded"></div>
          <div 
            className="absolute top-0 left-0 h-full bg-yellow-400 rounded" 
            style={{ width: `${(product.rating / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    )}
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Table Widget Demo</h1>
        <p className="text-gray-500 mb-6">A reusable table component with resize and fullscreen capabilities.</p>
      </div>
      
      <div className="space-y-6">
        <TableWidget
          title="User Management"
          icon={<Table className="h-5 w-5 text-purple-600" />}
          columns={userColumns}
          data={mockUsers}
          pageSize={5}
          initialHeight={400}
        />
        
        <TableWidget
          title="Product Inventory"
          icon={<Table className="h-5 w-5 text-blue-600" />}
          columns={productColumns}
          data={mockProducts}
          pageSize={5}
          initialHeight={350}
        />
      </div>
    </div>
  );
};

export default Index;
