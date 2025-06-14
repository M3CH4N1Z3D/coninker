import { ICompany } from "../../utils/interfaces";
import nodemailer from "nodemailer";
import { Company } from "../products/entities/product.entity";

const transporter = nodemailer.createTransport({
  service: "gmail", // Puedes cambiarlo por otro servicio SMTP
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS, // Tu contraseña o clave de aplicación
  },
});

export async function sendRegistrationEmail(
  email: string,
  firstName: string,
  lastName: string
) {
  const mailOptions = {
    from: `"SPM INTEGRAL" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Registro Exitoso",
    html: `
      <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Exitoso</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        body {
            font-family: 'Roboto', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background-color: #4285f4;
            padding: 20px;
            text-align: center;
        }
        
        .logo {
            width: 120px;
            height: auto;
        }
        
        .content {
            padding: 30px;
            text-align: center;
        }
        
        .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #333;
        }
        
        .subtitle {
            font-size: 18px;
            margin-bottom: 25px;
            color: #555;
        }
        
        .hero-image {
            width: 100%;
            max-width: 400px;
            margin: 20px auto;
            display: block;
        }
        
        .steps {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 6px;
            margin: 30px 0;
            text-align: left;
        }
        
        .step {
            display: flex;
            margin-bottom: 20px;
            align-items: flex-start;
        }
        
        .step-number {
            background-color: #4285f4;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .step-content {
            flex: 1;
        }
        
        .step-title {
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
        }
        
        .button {
            display: inline-block;
            background-color: #4285f4;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        
        .button:hover {
            background-color: #3367d6;
        }
        
        .footer {
            background-color: #f1f3f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
        
        .social-icons {
            margin: 15px 0;
        }
        
        .social-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin: 0 5px;
            background-color: #4285f4;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .social-icon img {
            width: 16px;
            height: 16px;
        }
        
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                border-radius: 0;
            }
            
            .content {
                padding: 20px;
            }
            
            .steps {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://via.placeholder.com/120x40/4285f4/ffffff?text=EMPRESA" alt="Logo de la empresa" class="logo">
        </div>
        
        <div class="content">
            <h1 class="title">¡Registro Exitoso!</h1>
            <p class="subtitle">Bienvenido a nuestra plataforma. Estamos emocionados de tenerte con nosotros.</p>
            
            <img src="https://via.placeholder.com/400x250/f5f7fa/333333?text=Inicio+al+Trabajo" alt="Inicio al trabajo" class="hero-image">
            
            <p>Estimado/a <strong>${firstName} ${lastName}</strong>,</p>
            <p>Tu cuenta ha sido creada exitosamente. Ahora puedes comenzar a utilizar todos nuestros servicios y herramientas para impulsar tu productividad.</p>
            
            <div class="steps">
                <h2>Próximos pasos</h2>

                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <div class="step-title">Inicia Sesión</div>
                        <p>Haz un recorrido guiado por la app y familiarizate con todas las herramientas.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <div class="step-title">Completa tu perfil</div>
                        <p>Añade tu información profesional para personalizar tu experiencia.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <div class="step-title">Añade la informacon de tu compañia</div>
                        <p>Descubre todas las funcionalidades que tenemos para ofrecerte.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <div class="step-title">Añade clientes, maquinas y a tu equipo de trabajo</div>
                        <p>Inicia a configurar tu espacio de trabajo y toda la informacion necesaria.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <div class="step-title">Genera la documentacion que necesitas.</div>
                        <p>gestiona ordenes de trabajo, genera informes en segundos, analiza indicadores y mucho mas con SPM INTEGRAL.</p>
                    </div>
                </div>
            </div>
            
            <a href="${process.env.FRONT_URL}/login" class="button">Acceder a mi cuenta</a>
        </div>
        
        <div class="footer">
            <div class="social-icons">
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=f" alt="Facebook">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=t" alt="Twitter">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=in" alt="LinkedIn">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=ig" alt="Instagram">
                </a>
            </div>
            
            <p>© 2025 Tu Empresa. Todos los derechos reservados.</p>
            <p>Si tienes alguna pregunta, contáctanos en <a href="mailto:soporte@tuempresa.com">soporte@tuempresa.com</a></p>
            <p><small>Si no solicitaste esta cuenta, por favor ignora este correo.</small></p>
        </div>
    </div>
</body>
</html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
}

export const sendLoginEmail = async (email: string) => {
  const mailOptions = {
    from: `"SPM INTEGRAL" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Nuevo inicio de sesion",
    html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuevo Inicio de Sesión</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        body {
            font-family: 'Roboto', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background-color: #4285f4;
            padding: 20px;
            text-align: center;
        }
        
        .logo {
            width: 120px;
            height: auto;
        }
        
        .content {
            padding: 30px;
            text-align: center;
        }
        
        .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #333;
        }
        
        .subtitle {
            font-size: 18px;
            margin-bottom: 25px;
            color: #555;
        }
        
        .hero-image {
            width: 100%;
            max-width: 400px;
            margin: 20px auto;
            display: block;
        }
        
        .alert-box {
            background-color: #fef8e8;
            border-left: 4px solid #fbbc04;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
            border-radius: 4px;
        }
        
        .device-info {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            text-align: left;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 10px;
        }
        
        .info-label {
            font-weight: 600;
            width: 120px;
            color: #555;
        }
        
        .info-value {
            flex: 1;
        }
        
        .steps {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 6px;
            margin: 30px 0;
            text-align: left;
        }
        
        .step {
            display: flex;
            margin-bottom: 20px;
            align-items: flex-start;
        }
        
        .step-number {
            background-color: #4285f4;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .step-content {
            flex: 1;
        }
        
        .step-title {
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
        }
        
        .button {
            display: inline-block;
            background-color: #4285f4;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        
        .button:hover {
            background-color: #3367d6;
        }
        
        .button-secondary {
            display: inline-block;
            background-color: #ffffff;
            color: #4285f4;
            border: 1px solid #4285f4;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 20px;
            margin-left: 10px;
            transition: background-color 0.3s;
        }
        
        .button-secondary:hover {
            background-color: #f1f3f4;
        }
        
        .footer {
            background-color: #f1f3f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
        
        .social-icons {
            margin: 15px 0;
        }
        
        .social-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin: 0 5px;
            background-color: #4285f4;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .social-icon img {
            width: 16px;
            height: 16px;
        }
        
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                border-radius: 0;
            }
            
            .content {
                padding: 20px;
            }
            
            .steps {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://via.placeholder.com/120x40/4285f4/ffffff?text=EMPRESA" alt="Logo de la empresa" class="logo">
        </div>
        
        <div class="content">
            <h1 class="title">Nuevo inicio de sesión detectado</h1>
            <p class="subtitle">Hemos detectado un nuevo acceso a tu cuenta</p>
            
            <img src="https://via.placeholder.com/400x250/f5f7fa/333333?text=Seguridad+de+Cuenta" alt="Seguridad de cuenta" class="hero-image">
            
            <p>Estimado/a <strong>Usuario</strong>,</p>
            <p>Hemos detectado un nuevo inicio de sesión en tu cuenta. Si fuiste tú, puedes ignorar este mensaje. Si no reconoces esta actividad, te recomendamos tomar medidas inmediatas.</p>
            
            <div class="alert-box">
                <p><strong>Nota de seguridad:</strong> Si no reconoces esta actividad, cambia tu contraseña inmediatamente y contacta con nuestro equipo de soporte.</p>
            </div>
            
            <div class="device-info">
                <h3>Detalles del inicio de sesión:</h3>
                
                <div class="info-row">
                    <div class="info-label">Fecha:</div>
                    <div class="info-value">20 de mayo de 2025, 15:30 hrs</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Dispositivo:</div>
                    <div class="info-value">Windows PC</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Navegador:</div>
                    <div class="info-value">Chrome 125.0.0.0</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Ubicación:</div>
                    <div class="info-value">Madrid, España</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Dirección IP:</div>
                    <div class="info-value">192.168.1.XX</div>
                </div>
            </div>
            
            <div class="steps">
                <h2>Recomendaciones de seguridad</h2>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <div class="step-title">Verifica tu actividad reciente</div>
                        <p>Revisa los últimos accesos y cambios en tu cuenta para detectar actividades sospechosas.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <div class="step-title">Actualiza tu contraseña</div>
                        <p>Cambia tu contraseña regularmente y utiliza una combinación segura de caracteres.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <div class="step-title">Activa la autenticación de dos factores</div>
                        <p>Añade una capa adicional de seguridad para proteger tu cuenta.</p>
                    </div>
                </div>
            </div>
            
            <a href="#" class="button">Confirmar que fui yo</a>
            <a href="#" class="button-secondary">Reportar actividad sospechosa</a>
        </div>
        
        <div class="footer">
            <div class="social-icons">
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=f" alt="Facebook">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=t" alt="Twitter">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=in" alt="LinkedIn">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=ig" alt="Instagram">
                </a>
            </div>
            
            <p>© 2025 Tu Empresa. Todos los derechos reservados.</p>
            <p>Si tienes alguna pregunta, contáctanos en <a href="mailto:soporte@tuempresa.com">soporte@tuempresa.com</a></p>
            <p><small>Este correo fue enviado automáticamente. Por favor, no respondas a este mensaje.</small></p>
        </div>
    </div>
</body>
</html>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

export const sendUpdateMyCompanyEmail = async (
  email: string,
  company: Company
) => {
  const mailOptions = {
    from: `"SPM INTEGRAL" <${process.env.EMAIL_USER}>`,
    subject: "Actualización de datos de la empresa",
    to: email,
    html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos de Compañía Editados</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        body {
            font-family: 'Roboto', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background-color: #4285f4;
            padding: 20px;
            text-align: center;
        }
        
        .logo {
            width: 120px;
            height: auto;
        }
        
        .content {
            padding: 30px;
            text-align: center;
        }
        
        .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #333;
        }
        
        .subtitle {
            font-size: 18px;
            margin-bottom: 25px;
            color: #555;
        }
        
        .hero-image {
            width: 100%;
            max-width: 400px;
            margin: 20px auto;
            display: block;
        }
        
        .info-box {
            background-color: #e8f0fe;
            border-left: 4px solid #4285f4;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
            border-radius: 4px;
        }
        
        .changes-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            text-align: left;
        }
        
        .changes-table th {
            background-color: #f1f3f4;
            padding: 12px 15px;
            border-bottom: 1px solid #dadce0;
        }
        
        .changes-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #dadce0;
        }
        
        .changes-table tr:last-child td {
            border-bottom: none;
        }
        
        .old-value {
            color: #d93025;
            text-decoration: line-through;
            font-style: italic;
        }
        
        .new-value {
            color: #188038;
            font-weight: 500;
        }
        
        .edit-info {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin: 20px 0;
            text-align: left;
        }
        
        .info-row {
            display: flex;
            margin-bottom: 10px;
        }
        
        .info-label {
            font-weight: 600;
            width: 120px;
            color: #555;
        }
        
        .info-value {
            flex: 1;
        }
        
        .steps {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 6px;
            margin: 30px 0;
            text-align: left;
        }
        
        .step {
            display: flex;
            margin-bottom: 20px;
            align-items: flex-start;
        }
        
        .step-number {
            background-color: #4285f4;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .step-content {
            flex: 1;
        }
        
        .step-title {
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
        }
        
        .button {
            display: inline-block;
            background-color: #4285f4;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        
        .button:hover {
            background-color: #3367d6;
        }
        
        .button-secondary {
            display: inline-block;
            background-color: #ffffff;
            color: #4285f4;
            border: 1px solid #4285f4;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 20px;
            margin-left: 10px;
            transition: background-color 0.3s;
        }
        
        .button-secondary:hover {
            background-color: #f1f3f4;
        }
        
        .footer {
            background-color: #f1f3f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666;
        }
        
        .social-icons {
            margin: 15px 0;
        }
        
        .social-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin: 0 5px;
            background-color: #4285f4;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        
        .social-icon img {
            width: 16px;
            height: 16px;
        }
        
        @media only screen and (max-width: 600px) {
            .container {
                width: 100%;
                border-radius: 0;
            }
            
            .content {
                padding: 20px;
            }
            
            .steps {
                padding: 15px;
            }
            
            .changes-table {
                font-size: 14px;
            }
            
            .changes-table th,
            .changes-table td {
                padding: 8px 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://via.placeholder.com/120x40/4285f4/ffffff?text=EMPRESA" alt="Logo de la empresa" class="logo">
        </div>
        
        <div class="content">
            <h1 class="title">Datos de compañía editados</h1>
            <p class="subtitle">Se han realizado cambios en la información de tu empresa</p>
            
            <img src="https://via.placeholder.com/400x250/f5f7fa/333333?text=Actualización+de+Datos" alt="Actualización de datos" class="hero-image">
            
            <p>Estimado/a <strong>Administrador</strong>,</p>
            <p>Te informamos que se han realizado modificaciones en los datos de tu compañía. A continuación, encontrarás un resumen de los cambios efectuados.</p>
            
            <div class="info-box">
                <p><strong>Nota importante:</strong> Si no reconoces estos cambios, por favor contacta inmediatamente con nuestro equipo de soporte.</p>
            </div>
            
            <div class="edit-info">
                <h3>Detalles de la edición:</h3>
                
                <div class="info-row">
                    <div class="info-label">Fecha:</div>
                    <div class="info-value">20 de mayo de 2025, 14:45 hrs</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Usuario:</div>
                    <div class="info-value">admin@tuempresa.com</div>
                </div>
                
                <div class="info-row">
                    <div class="info-label">Dirección IP:</div>
                    <div class="info-value">192.168.1.XX</div>
                </div>
            </div>
            
            <h3>Cambios realizados</h3>
            
            <table class="changes-table">
                <thead>
                    <tr>
                        <th>Campo</th>
                        <th>Nuevo valor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nombre comercial</td>
                        <td class="new-value">${company.name}</td>
                    </tr>
                    <tr>
                    <td>Teléfono</td>
                    <td class="new-value">${company.phone}</td>
                    </tr>
                    <tr>
                    <td>Departamento</td>
                    <td class="new-value">${company.department}</td>
                    </tr>
                    <tr>
                    <td>Ciudad</td>
                    <td class="new-value">${company.city}</td>
                    </tr>
                    <tr>
                        <td>Dirección</td>
                        <td class="new-value">${company.address}</td>
                    </tr>
                    <tr>
                    <td>Correo</td>
                    <td class="new-value">${company.contactEmail}</td>
                    </tr>
                    <tr>
                    <td>NIT</td>
                    <td class="new-value">${company.nit}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="steps">
                <h2>Acciones recomendadas</h2>
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <div class="step-title">Verifica los cambios</div>
                        <p>Revisa que todos los cambios realizados sean correctos y estén autorizados.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <div class="step-title">Actualiza documentación</div>
                        <p>Asegúrate de actualizar cualquier documentación interna o externa que contenga la información modificada.</p>
                    </div>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <div class="step-title">Informa a tu equipo</div>
                        <p>Comunica estos cambios a los miembros relevantes de tu organización.</p>
                    </div>
                </div>
            </div>
            
            <a href="#" class="button">Revisar cambios completos</a>
            <a href="#" class="button-secondary">Revertir cambios</a>
        </div>
        
        <div class="footer">
            <div class="social-icons">
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=f" alt="Facebook">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=t" alt="Twitter">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=in" alt="LinkedIn">
                </a>
                <a href="#" class="social-icon">
                    <img src="https://via.placeholder.com/16/ffffff/ffffff?text=ig" alt="Instagram">
                </a>
            </div>
            
            <p>© 2025 Tu Empresa. Todos los derechos reservados.</p>
            <p>Si tienes alguna pregunta, contáctanos en <a href="mailto:soporte@tuempresa.com">soporte@tuempresa.com</a></p>
            <p><small>Este correo fue enviado automáticamente. Por favor, no respondas a este mensaje.</small></p>
        </div>
    </div>
</body>
</html>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};
