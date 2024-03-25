import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import { FaGithub, FaGoogle, FaFacebook } from 'react-icons/fa';
import { searchEmpleado } from '../classes/Empleado/EmpleadoApi';
import Empleado from '../classes/Empleado/Empleado';
import { useNavigate, useParams } from 'react-router-dom';
import { loggedEmpleado, login } from '../classes/Empleado/EmpleadoAuth';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Toaster, toast } from 'sonner';

const LoginForm = () => {
  const navigate = useNavigate();
  const { param } = useParams();
  const [empleado, setEmpleado] = useState(new Empleado());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const signIn = useSignIn(); // Use useSignIn hook here

  const search = async () => {
    if (param !== 'new') {
      let result = await searchEmpleado(param);
      if (result) {
        setEmpleado(result);
      }
    }
  };

  const verifyLogin = async () => {
    if (param !== 'new') {
      try {
        await login(signIn, email, password);
        const loggedInEmpleado = await loggedEmpleado();
        setEmpleado(loggedInEmpleado);

        // Set logged-in empleado in local storage
        localStorage.setItem('empleado', JSON.stringify(loggedInEmpleado));

        if (isChecked) {
          document.cookie = "rememberMe=true; max-age=604800";
          console.log("Opción de mantener sesión creada. Creando cookie para recordar la sesión.");
        }
        else {
          console.log("Opción de mantener sesión creada es falso. No se creará la cookie para recordar la sesión");
        }

        // Redirect to '/'
        navigate('/'); // assuming you have access to history object or use withRouter HOC
      } catch (error) {
        if (error.response && error.response.data) {
          // If the server returns an error message, log it
          console.error("Server error:", error.response.data.error);
        } else if (error.message === "Failed to fetch") {
          // If the request fails due to network issues
          console.error("Failed to fetch. Please check your internet connection.");
        } else {
          // For any other unexpected errors
          console.error("An unexpected error occurred:", error.message);
          toast.error('Fallo en el inicio de sesión. ¿Son las credenciales correctas?')
        }
      }
    }
  };



  useEffect(() => {
    search();

  }, [param]);

  useEffect(() => {
    var container_login_register = document.querySelector(".container__login-register");
    var form_login = document.querySelector(".form__login");
    var form_register = document.querySelector(".form__register");
    var back_box_login = document.querySelector(".back__box-login");
    var back_box_register = document.querySelector(".back__box-register");

    function register() {
      if (window.innerWidth > 850) {
        form_register.style.display = "block";
        container_login_register.style.left = "410px";
        form_login.style.display = "none";
        back_box_register.style.opacity = "0";
        back_box_login.style.opacity = "1";
      } else {
        form_register.style.display = "block";
        container_login_register.style.left = "0px";
        form_login.style.display = "none";
        back_box_register.style.display = "none";
        back_box_login.style.display = "block";
        back_box_login.style.opacity = "1";
      }
    }

    function login() {
      if (window.innerWidth > 850) {
        form_register.style.display = "none";
        container_login_register.style.left = "10px";
        form_login.style.display = "block";
        back_box_register.style.opacity = "1";
        back_box_login.style.opacity = "0";
      } else {
        form_register.style.display = "none";
        container_login_register.style.left = "0px";
        form_login.style.display = "block";
        back_box_register.style.display = "block";
        back_box_login.style.display = "none";
      }
    }

    function sizePage() {
      if (window.innerWidth > 850) {
        back_box_login.style.display = "block";
        back_box_register.style.display = "block";
      } else {
        back_box_register.style.display = "block";
        back_box_register.style.opacity = "1";
        back_box_login.style.display = "none";
        form_login.style.display = "block";
        form_register.style.display = "none";
        container_login_register.style.left = "0";
      }
    }

    sizePage();
    document.getElementById("btn__register").addEventListener("click", register);
    document.getElementById("btn__start-sesion").addEventListener("click", login);
    window.addEventListener("resize", sizePage);

    return () => {
      window.removeEventListener("resize", sizePage);
    };
  }, []);

  return (
    <div className="new-body">
      <Toaster
        toastOptions={{
          style: {
            fontSize: '1.5rem', // Increase font size
            padding: '1rem 1rem', // Increase padding
          },
        }}
        richColors
        closeButton
        expand={true}
      />
      <main>
        <div className="container__all">
          <div className="back__box">
            <div className="back__box-login">
              <h3>¿Ya posees una cuenta?</h3>
              <p>Inicia sesión para entrar a la página.</p>
              <button id="btn__start-sesion">Iniciar Sesión</button>
            </div>
            <div className="back__box-register">
              <h3>¿Aun no has creado tu cuenta?</h3>
              <p>¿Qué estás esperando? Regístrate para iniciar sesión aquí.</p>
              <button id="btn__register">Registrarse</button>
            </div>
          </div>
          <div className="container__login-register">
            <form action="" className="form__login">
              <h2>Iniciar Sesión</h2>
              <input
                value={email}
                type="text"
                placeholder="Correo Electrónico"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="form-group flex items-center gap-2">
                <div className="checkbox-container"style={{ marginTop: '15px' }}>
                  <input
                    type="checkbox"
                    id="session-checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <label htmlFor="session-checkbox" className="cursor-pointer flex items-center">
                    <div className="w-6 h-6 border-2 rounded-md border-cyan-500 flex items-center justify-center mr-2 focus:outline-none">
                      {isChecked && (
                        <svg
                          className="w-4 h-4 text-cyan-500 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    Mantener sesión iniciada
                  </label>
                </div>
              </div>

              <button
                onClick={verifyLogin} className="bg-cyan-500 text-white" type="button">
                Entrar
              </button>

              <div className="icons-section">
                <hr className="line" />
                <p className="icons-text">O intenta usando una de las siguientes aplicaciones:</p>
                <div className="icons-container">
                  <FaGithub className="icon" />
                  <FaGoogle className="icon" />
                  <FaFacebook className="icon" />
                </div>
              </div>
            </form>

            <form action="" className="form__register">
              <h2>Registrarse</h2>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Nombre" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Apellido" />
                </div>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Email" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="DNI" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Teléfono Celular" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="password" placeholder="Contraseña" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="password" placeholder="Confirmar Contraseña" />
                </div>
              </div>

              {/* Select en donde al endpoint creado sea llamado te devuelva la lista de roles ya existente. */}
              <button className="bg-cyan-500 text-white">Registrarse</button>
              <div className="icons-section">
                <hr className="line" />
                <p className="icons-text">O intenta usando una de las siguientes aplicaciones:</p>
                <div className="icons-container">
                  <FaGithub className="icon" />
                  <FaGoogle className="icon" />
                  <FaFacebook className="icon" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginForm;
