"use client";


// Definir la interfaz para las props
interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function Navbar({ searchTerm, setSearchTerm }: NavbarProps) {
  return (
    <nav className="navbar">
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {/* Podemos incluir otros elementos si lo deseamos */}
      <div className="nav-links">
        <a href="#">Inicio</a>
        <a href="#">Acerca</a>
      </div>
    </nav>
  );
}
