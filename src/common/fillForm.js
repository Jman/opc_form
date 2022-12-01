export default function fillForm(formData) {
  const keyboardEvent = document.createEvent('UiEvent');
  const changeEvent = document.createEvent('UiEvent');
  const clickEvent = document.createEvent('UiEvent');

  keyboardEvent.initEvent('keyup', true, true);
  changeEvent.initEvent('change', true, true);
  clickEvent.initEvent('click', true, true);

  function processSelect(elem, value) {
    for (let index = 0, l = elem.length; index < l; index++) {
      const options = elem.options[index];
      if (
        options.value.toLowerCase() === value ||
        options.title.toLowerCase() === value ||
        options.innerHTML.toLowerCase() === value
      ) {
        elem.selectedIndex = index;
      }
    }
  }

  function processElement(elem, value) {
    elem.focus();
    if (elem.tagName.toLowerCase() === 'input') {
      elem.value = value;
      elem.dispatchEvent(keyboardEvent);
      elem.dispatchEvent(changeEvent);
    } else if (elem.tagName.toLowerCase() === 'select') {
      processSelect(elem, value.toLowerCase());
      elem.dispatchEvent(changeEvent);
    }
    elem.blur();
  }

  Object.keys(formData).forEach(function (name) {
    const inputs = document.querySelectorAll(`[name*="${name}"]`) ?? [];
    inputs.forEach((elem) => {
      processElement(elem, formData[name]);
    });
  });

  // M1 Shipping
  const m1ShippingElements =
    document.querySelectorAll('[name^="shipping"]') ?? [];
  m1ShippingElements.forEach((elem) => {
    const value = formData[elem.name];
    if (value) {
      processElement(elem, value);
    }
  });

  // M2 Shipping
  const m2ShippingForm = document.getElementById('co-shipping-form') ?? [];
  [...m2ShippingForm].forEach((elem) => {
    const value = formData[`shipping[${elem.name}]`];
    if (value) {
      processElement(elem, value);
    }
  });

  const shippingMethodsForm = document.getElementById(
    'checkout-shipping-method-load'
  );
  if (shippingMethodsForm) {
    shippingMethodsForm
      .querySelector('input[type="radio"]')
      .dispatchEvent(clickEvent);
  }

  // Venia
  const selects = document.querySelectorAll('[name="country"],[name="region"]');
  if (selects) {
    selects.forEach((elem) => {
      const value = formData[`shipping[${elem.name}_id]`];
      if (value) {
        processElement(elem, value);
      }
    });
  }
}
