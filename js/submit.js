window.alert ('Se você quiser, você pode deixar uma mensagem para o desenvolvedor ao enviar a descrição do projeto')

class FormSubmit {
    constructor (settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendform = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }
    
    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }
    
    async sendForm(event) {
        try {
            this.onSubmission(event)
            await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendform);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<div class='retorno'><i class='enviado bi bi-patch-check'></i> </br> <h1 class='success'>Mesagem enviada!</h1> </div>",
    error: "<div class='retorno'><i class='erro bi bi-patch-exclamation'></i> </br> <h1 class='error'>Mesagem não foi enviada, tente novamente.</h1> </div>"
});
formSubmit.init();