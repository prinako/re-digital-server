const category = document.querySelector("#category");

category.addEventListener('click', function () {
    console.log(this.value)
    let moreDetailes = document.querySelector("#more-detailes");
    const romoveDisplayNoneClass = () => moreDetailes.removeAttribute("class");

    if (this.value === 'phone') {
        romoveDisplayNoneClass();
        moreDetailes.innerHTML = '<div id="phone" class="wt-h mg-b product"><label class="form-label" for="brand">Brand</label><select class="form-select" name="brand" id="brand"><option value="">Select</option><option value="samsung">Samsung</option><option value="vivo">Vivo</option><option value="moto">Motrola</option><option value="xiaomi">Xiaomi</option></select></div>'
    } else if (this.value === 'housing') {
        romoveDisplayNoneClass();
        moreDetailes.innerHTML = '<div id="phone" class="wt-h mg-b product"><label class="form-label" for="brand">House for Sale or Rent</label><select class="form-select" name="house" id="brand"><option value="">Select</option><option value="rent">Rent</option><option value="sale">For Sale</option></select></div>'
    } else if (this.value === 'computer') {
        romoveDisplayNoneClass();
        moreDetailes.innerHTML = '<div id="phone" class="wt-h mg-b product"><label class="form-label" for="brand">Platform</label><select class="form-select" name="platform" id="brand"><option value="">Select</option><option value="desktop">Disktop</option><option value="laptop">Laptop</option></select></div>'
    } else if (this.value === 'game') {
        romoveDisplayNoneClass();
        moreDetailes.innerHTML = '<div id="phone" class="wt-h mg-b product"><label class="form-label" for="brand">Platform</label><select class="form-select" name="platform" id="brand"><option value="">Select</option><option value="hand-consloe">Hand Held Consoles</option><option value="playstaion">Playstaion</option><option value="xbox">Xbox</option></select></div>'
    } else if (this.value === 'accessorie') {
        romoveDisplayNoneClass();
        moreDetailes.innerHTML = '<div id="phone" class="wt-h mg-b product"><label class="form-label" for="brand">Platform</label><select class="form-select" name="platform" id="brand"><option value="">Select</option><option value="phone">Phone</option><option value="laptop">Laptop</option><option value="desktop">Desktop</option><option value="others">Others</option></select></div>'
    } else {
        try {
            moreDetailes.setAttribute("class", "display-none");
            document.querySelector('#phone').remove();
        } catch { }
    }
    if (this.value === 'housing') {
        document.querySelector('#condition').setAttribute("disabled", "disabled");
    } else {
        document.querySelector('#condition').removeAttribute("disabled", "disabled");
    }
    try {
        document.querySelector("#brand").setAttribute("required", "required");
    } catch { }
});