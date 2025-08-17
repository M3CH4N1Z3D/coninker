// frontend/src/app/terminos-y-condiciones/page.tsx

import React from 'react';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

const TerminosYCondicionesPage = () => {
  return (
    <LegalPageLayout title="Términos y Condiciones">
        <p>En Coninker, cada pieza que fabricamos es única, hecha a mano y pensada para durar. Nos tomamos muy en serio el diseño, los materiales y el color, por eso creemos importante que conozcas nuestros Términos y Condiciones:</p>

        <h2>1. Sobre nuestros productos</h2>
        <p>Todos nuestros muebles se fabrican bajo pedido, lo que significa que comenzamos su producción una vez confirmado el pago.</p>
<br />
        <h2>2. Tiempos de producción</h2>
        <p>Para productos de catálogo (con personalización de color) entre 25 y 30 días hábiles.</p>

        {/* ... Resto del contenido ... */}
    </LegalPageLayout>
  );
};

export default TerminosYCondicionesPage;