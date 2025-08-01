import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

// ===== PÁGINAS PÚBLICAS =====
import LandingPage from './pages/landing/LandingPage.jsx'
import LoginComponent from './components/auth/login/LoginComponent.jsx'

// ===== LAYOUTS Y WRAPPERS =====
import AdminLayout from './layouts/AdminLayout.jsx'

// ===== PÁGINAS DE ADMIN =====
import DashboardComponent from './components/dashboard/DashboardComponent.jsx'
// import AdminUsers from './pages/admin/AdminUsers.jsx'
// import AdminProducts from './pages/admin/AdminProducts.jsx'

// ===== PÁGINAS DE CLIENTE =====
// import CustomerProfile from './pages/customer/CustomerProfile.jsx'
// import CustomerOrders from './pages/customer/CustomerOrders.jsx'

// ===== COMPONENTES DE PROTECCIÓN =====
import { AdminRoute, CustomerRoute } from './ProtectedRoute.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== RUTAS PÚBLICAS ==================== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<div>Registro</div>} />

        {/* ==================== RUTAS DE ADMIN CON LAYOUT ==================== */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          {/* Rutas hijas que se renderizan en <Outlet /> */}
          <Route index element={<DashboardComponent />} />
          {/* <Route path="users" element={<AdminUsers />} /> */}
          {/* <Route path="products" element={<AdminProducts />} /> */}
          {/* <Route path="orders" element={<div>Admin Orders</div>} />
          <Route path="settings" element={<div>Admin Settings</div>} />
          <Route path="stats" element={<div>Estadísticas</div>} />
          <Route path="categories" element={<div>Categorías</div>} />
          <Route path="images" element={<div>Imágenes</div>} />
          <Route path="reviews" element={<div>Reseñas</div>} />
          <Route path="wishlists" element={<div>Wishlists</div>} />
          <Route path="roles" element={<div>Roles & Permisos</div>} /> */}
        </Route>

        {/* ==================== RUTAS DE CLIENTE (ANIDADAS) ==================== */}
        <Route path="/customer/*" element={
          <CustomerRoute>
            <Routes>
              {/* <Route path="profile" element={<CustomerProfile />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="wishlist" element={<div>Mi Wishlist</div>} />
              <Route path="addresses" element={<div>Mis Direcciones</div>} /> */}
            </Routes>
          </CustomerRoute>
        } />

        {/* ==================== RUTAS DE PRODUCTOS (PÚBLICAS) ==================== */}
        {/* <Route path="/products" element={<div>Lista de Productos</div>} />
        <Route path="/products/:id" element={<div>Detalle de Producto</div>} />
        <Route path="/categories/:category" element={<div>Productos por Categoría</div>} /> */}

        {/* ==================== RUTA 404 ==================== */}
        <Route path="*" element={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column'
          }}>
            <h1>404 - Página no encontrada</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App