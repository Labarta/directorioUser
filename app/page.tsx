"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar/page';
import Link from 'next/link'; 

// Definimos la interfaz para el tipo de usuario
interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export default function Home() {
  // Tipamos los estados con los tipos adecuados
  const [users, setUsers] = useState<User[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users); 
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  // Filtra los usuarios en función del término de búsqueda
  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Si se está cargando, mostramos un mensaje de carga
  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Lista de usuarios filtrada */}
      <div className="grid-container">
        <div className="grid">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="user-card">
                {/* Enlace hacia la página de detalles del usuario */}
                <Link href={`/user/${user.id}`}>
                  <h2>{`${user.firstName} ${user.lastName}`}</h2>
                  <p>Usuario: {user.username}</p>
                  <p>Email: {user.email}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No se encontraron usuarios.</p>
          )}
        </div>
      </div>
    </div>
  );
}
