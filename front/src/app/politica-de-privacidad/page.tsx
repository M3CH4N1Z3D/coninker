// frontend/src/app/politica-de-privacidad/page.tsx

import React from 'react';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

const PoliticaDePrivacidadPage = () => {
    // Placeholder para el correo. Lo he definido como una constante para fácil reemplazo.
    const INSTITUTIONAL_EMAIL = "[Correo Institucional Pendiente]";

    return (
        <LegalPageLayout title="Política de Privacidad">
            <p>En Coninker, valoramos y protegemos tu información personal conforme a la Ley 1581 de 2012 y sus decretos reglamentarios sobre protección de datos personales en Colombia.</p>
            
            <h2>1. Responsable del Tratamiento</h2>
            <p>
                Nombre completo: Maria Carolina Perez Alzate<br />
                Nombre comercial: Cóninker<br />
                Domicilio: Cartago, Valle del cauca, Colombia.<br />
                Correo electrónico de contacto: {INSTITUTIONAL_EMAIL}<br />
                Teléfono (opcional): 3161900539
            </p>
<br />
            <h2>2. Datos personales que recolectamos</h2>
            <p>Solo recolectamos los datos necesarios para realizar la venta y entrega de nuestros productos: Nombre completo, Número de teléfono, Dirección de entrega, Correo electrónico.</p>
<br />
            <h2>3. Finalidades del tratamiento</h2>
            <p>Usamos tus datos personales exclusivamente para: Procesar y despachar tus pedidos, Emitir facturas o comprobantes y Comunicarnos contigo sobre el estado de tu compra.</p>


            {/* ... Resto del contenido ... */}
        </LegalPageLayout>
    );
};

export default PoliticaDePrivacidadPage;