export function darkMode() {
    const button = document.querySelector('.theme__mode');
    const body = document.querySelector('body');
    const img = document.querySelector('.icon__theme');
    
    const themeSaved = localSaved();

    if (themeSaved === 'true') {
        body.classList.add('dark');
        img.src = 'src/assets/icon/sun.svg';

    } else {
        body.classList.remove('dark');
        img.src = 'src/assets/icon/moon-icon.svg';
    }

    button.addEventListener('click', () => {
        if(body.classList.toggle('dark')) {
            img.src = 'src/assets/icon/sun.svg';
            localStorage.setItem('@openMusic:theme', 'true');

        } else {
            img.src = 'src/assets/icon/moon-icon.svg';
            localStorage.removeItem('@openMusic:theme');
        }
    });



}

function localSaved() {
    return localStorage.getItem('@openMusic:theme')

}
