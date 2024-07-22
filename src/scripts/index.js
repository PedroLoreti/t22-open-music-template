function genresLogic() {
    const buttons = document.querySelectorAll('.button__gender');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('black'));

            button.classList.add('black')
        })
    })
}

genresLogic()