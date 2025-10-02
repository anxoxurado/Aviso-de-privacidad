let consentimiento = null; // variable de sesión en memoria


const banner = document.getElementById('banner');
const dlg = document.getElementById('configurar');


const btnAceptarTodo = document.getElementById('btn-aceptar-todo');
const btnConfigurar = document.getElementById('btn-configurar');
const btnCerrar = document.getElementById('btn-cerrar');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');



function mostrarBanner(){ if(consentimiento===null) { banner.classList.add('show'); } }
function cerrarBanner(){ banner.classList.remove('show'); }


function openConfig(){ dlg.showModal(); }
function closeConfig(){ dlg.close(); }

/*Mandar mensajes de aceptado
function aceptarTodo(){
consentimiento = 'all';
cerrarBanner();
alert('Consentimiento registrado: todo aceptado (solo sesión actual).');
}


function guardarPrefs(){
const f = document.getElementById('prefs');
consentimiento = { nec:true, med:f.med.checked, mk:f.mk.checked };
cerrarBanner();
closeConfig();
alert('Preferencias guardadas (solo sesión actual).');
}*/


// Eventos
btnConfigurar.addEventListener('click', openConfig);
btnCerrar.addEventListener('click', cerrarBanner);
btnCerrarModal.addEventListener('click', closeConfig);



// Inicialización
window.addEventListener('DOMContentLoaded', mostrarBanner);




// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect on hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});