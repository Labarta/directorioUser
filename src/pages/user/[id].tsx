import { GetServerSideProps } from 'next';
import Link from 'next/link';


// Definimos la interfaz para el tipo de usuario
interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  gender: string;
  address: {
    city: string;
    state: string;
  };
  company: {
    name: string;
  };
}

// Definimos los props que recibe el componente
interface UserDetailProps {
  user: User;
}

// Usamos `getServerSideProps` para obtener datos del servidor antes de que la página se renderice
export const getServerSideProps: GetServerSideProps<UserDetailProps> = async (context) => {
  const { id } = context.params as { id: string };

  // Llamada a la API para obtener el detalle del usuario
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  const data = await res.json();

  // Retornamos los datos como props
  return {
    props: {
      user: data,
    },
  };
};


const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  return (
    <div>
      <Link href="/">
        <button className="back-button">Regresar</button>
      </Link>

      <h1>Detalles de {user.firstName} {user.lastName}</h1>
      <p>Usuario: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Edad: {user.age}</p>
      <p>Género: {user.gender}</p>
      <p>Dirección: {user.address.city}, {user.address.state}</p>
      <p>Empresa: {user.company.name}</p>
    </div>
  );
};

export default UserDetail;
