const Name = document.querySelector("#name");
const nameEdit = document.querySelector("#name-edit-btn");
const userName = document.querySelector("#username");
const userNameEdit = document.querySelector("#username-edit-btn");
const Email = document.querySelector("#email");
const emailEdit = document.querySelector("#email-edit-btn");
const saveBtn = document.querySelector("#save-btn");

const oldName = Name.value;
const oldEmail = Email.value;
const oldUserName = userName.value;

nameEdit.addEventListener("click", () => {
    disOrEnableInput(Name);
});

userNameEdit.addEventListener("click", () => {
    disOrEnableInput(userName);
});

emailEdit.addEventListener("click", () => {
    disOrEnableInput(Email);
})

Name.addEventListener("keyup", () => {
    disOrEnableSaveOrEditBtn(nameEdit);
});
userName.addEventListener("keyup", () => {
    disOrEnableSaveOrEditBtn(userNameEdit);
});
Email.addEventListener("keyup", () => {
    disOrEnableSaveOrEditBtn(emailEdit);
});

function disOrEnableInput(whichOf) {
    
    whichOf.toggleAttribute("disabled");
    whichOf.focus();
}

function disOrEnableSaveOrEditBtn(editBtn) {

    if (oldName !== Name.value) {
        if (saveBtn.hasAttribute("disabled")) {
            saveBtn.removeAttribute("disabled")
        }
        editBtn.classList.add("disabled-edit-btn")

        if (oldEmail === Email.value) {
            emailEdit.classList.remove("disabled-edit-btn")
        }
        if (oldUserName === userName.value) {
            userNameEdit.classList.remove("disabled-edit-btn")
        }

    } else if (oldEmail !== Email.value) {
        if (saveBtn.hasAttribute("disabled")) {
            saveBtn.removeAttribute("disabled")
        }
        editBtn.classList.add("disabled-edit-btn")

        if (oldName === Name.value) {
            nameEdit.classList.remove("disabled-edit-btn")
        }
        if (oldUserName === userName.value) {
            userNameEdit.classList.remove("disabled-edit-btn")
        }

    } else if (oldUserName !== userName.value) {
        if (saveBtn.hasAttribute("disabled")) {
            saveBtn.removeAttribute("disabled");
        }
        editBtn.classList.add("disabled-edit-btn")
        if (oldEmail === Email.value) {
            emailEdit.classList.remove("disabled-edit-btn")
        }
        if (oldName === Name.value) {
            nameEdit.classList.remove("disabled-edit-btn")
        }

    } else {
        if (oldName === Name.value || oldEmail === Email.value || oldUserName === userName.value) {
            if (!saveBtn.hasAttribute("disabled")) {
                saveBtn.setAttribute("disabled", "disabled");
            }
        }
        editBtn.classList.remove("disabled-edit-btn")
    }
}
