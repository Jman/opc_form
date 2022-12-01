export default function fillForm(formData) {
  const keyboardEvent = document.createEvent('UiEvent');
  const selectEvent = document.createEvent('UiEvent');
  const clickEvent = document.createEvent('UiEvent');

  keyboardEvent.initEvent('keyup', true, true);
  selectEvent.initEvent('change', true, true);
  clickEvent.initEvent('click', true, true);

  function processSelect(el, val) {
    for (let i = 0, l = el.length; i < l; i++) {
      if (el.options[i].value.toLowerCase() === val ||
        el.options[i].title.toLowerCase() === val ||
        el.options[i].innerHTML.toLowerCase() === val) {
        el.selectedIndex = i;
      }
    }
  }

  function processElement(elem, value) {
    elem.focus();
    if (elem.tagName.toLowerCase() === 'input') {
      elem.value = value;
      elem.dispatchEvent(keyboardEvent);
    } else if (elem.tagName.toLowerCase() === 'select') {
      processSelect(elem, value.toLowerCase());
      elem.dispatchEvent(selectEvent);
    }
    elem.blur();
  }

  Object.keys(formData).forEach(function (name) {
    const inputs = document.querySelectorAll('[name*="' + name + '"]') ?? [];
    inputs.forEach((elem) => {
      processElement(elem, formData[name]);
    });
  });
  // M1 Shipping
  const m1ShippingElements = document.querySelectorAll('[name^="shipping"]') ?? [];
  m1ShippingElements.forEach((elem) => {
    if (formData[elem.name]) {
      processElement(elem, formData[elem.name]);
    }
  });
  // M2 Shipping
  const m2ShippingForm = document.getElementById('co-shipping-form') ?? [];
  [...m2ShippingForm].forEach(function (elem) {
    if (formData['shipping[' + elem.name + ']']) {
      processElement(elem, formData['shipping[' + elem.name + ']']);
    }
  });

  document.getElementById('checkout-shipping-method-load')
    .querySelector('input[type="radio"]')
    .dispatchEvent(clickEvent);
}