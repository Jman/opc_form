<template>
  <form id="form" :class="$style.form" action="/" @submit.prevent="saveUser">
    <div :class="$style.actions">
      <transition name="fade">
        <div v-if="message" :class="$style.alert">
          {{ message }}
        </div>
      </transition>
      <button v-if="isDirty" @click.prevent="setDefault">Use Default</button>
      <button @click.prevent="saveUser">Submit</button>
    </div>
    <fieldset>
      <legend>User Info</legend>
      <ul :class="$style.formList">
        <li :class="$style.field">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="localForm.email"
            type="email"
            name="email"
          />
        </li>
        <li :class="$style.field">
          <label for="password">Password</label>
          <input id="password" v-model="localForm.password" name="password" />
        </li>
        <li :class="$style.field">
          <label for="firstname">Firstname</label>
          <input
            id="firstname"
            v-model="localForm.firstname"
            name="firstname"
          />
        </li>
        <li :class="$style.field">
          <label for="lastname">Lastname</label>
          <input id="lastname" v-model="localForm.lastname" name="lastname" />
        </li>
        <li :class="$style.field">
          <label for="telephone">Telephone</label>
          <input
            id="telephone"
            v-model="localForm.telephone"
            name="telephone"
          />
        </li>
      </ul>
    </fieldset>
    <fieldset>
      <legend>Billing Address</legend>
      <ul :class="$style.formList">
        <li :class="$style.field">
          <label for="street">Street</label>
          <input id="street" v-model="localForm.street" name="street" />
        </li>
        <li :class="$style.field">
          <label for="city">City</label>
          <input id="city" v-model="localForm.city" name="city" />
        </li>
        <li :class="$style.field">
          <label for="country_id">Country</label>
          <input
            id="country_id"
            v-model="localForm.country_id"
            name="country_id"
          />
          <span :class="$style.hint">should be shortcode</span>
        </li>
        <li :class="$style.field">
          <label for="region_id">State</label>
          <input
            id="region_id"
            v-model="localForm.region_id"
            name="region_id"
          />
          <span :class="$style.hint"
            >can be integer id or string name of state</span
          >
        </li>
        <li :class="$style.field">
          <label for="postcode">Postcode</label>
          <input id="postcode" v-model="localForm.postcode" name="postcode" />
        </li>
      </ul>
    </fieldset>
    <fieldset>
      <legend>Shipping Address</legend>
      <ul :class="$style.formList">
        <li :class="$style.field">
          <label for="shipping_firstname">Firstname</label>
          <input
            id="shipping_firstname"
            v-model="localForm['shipping[firstname]']"
            name="shipping[firstname]"
          />
        </li>
        <li :class="$style.field">
          <label for="shipping_lastname">Lastname</label>
          <input
            id="shipping_lastname"
            v-model="localForm['shipping[lastname]']"
            name="shipping[lastname]"
          />
        </li>
        <li :class="$style.field">
          <label for="shipping_email">Email</label>
          <input
            id="shipping_email"
            v-model="localForm['shipping[email]']"
            type="email"
            name="shipping[email]"
          />
        </li>
        <li :class="$style.field">
          <label for="shipping_telephone">Telephone</label>
          <input
            id="shipping_telephone"
            v-model="localForm['shipping[telephone]']"
            name="shipping[telephone]"
          />
        </li>
        <li :class="$style.field">
          <label for="shipping_street">Street</label>
          <input
            id="shipping_street"
            v-model="localForm['shipping[street][]']"
            name="shipping[street][]"
          />
        </li>
        <li :class="$style.field">
          <label for="shipping_city">City</label>
          <input
            id="shipping_city"
            v-model="localForm['shipping[city]']"
            name="shipping[city]"
          />
        </li>
        <li :class="$style.field">
          <label for="shipping_country_id">Country</label>
          <input
            id="shipping_country_id"
            v-model="localForm['shipping[country_id]']"
            name="shipping[country_id]"
          />
          <span :class="$style.hint">should be shortcode</span>
        </li>
        <li :class="$style.field">
          <label for="shipping_region_id">State</label>
          <input
            id="shipping_region_id"
            v-model="localForm['shipping[region_id]']"
            name="shipping[region_id]"
          />
          <span :class="$style.hint">
            can be integer id or string name of state
          </span>
        </li>
        <li :class="$style.field">
          <label for="shipping_postcode">Postcode</label>
          <input
            id="shipping_postcode"
            v-model="localForm['shipping[postcode]']"
            name="shipping[postcode]"
          />
        </li>
      </ul>
    </fieldset>
    <fieldset>
      <legend>Payment Info</legend>
      <ul :class="$style.formList">
        <li :class="$style.field">
          <label for="cc_owner">Owner Name</label>
          <input id="cc_owner" v-model="localForm.cc_owner" name="cc_owner" />
        </li>
        <li :class="$style.field">
          <label for="cc_number">Card Number</label>
          <input
            id="cc_number"
            v-model="localForm.cc_number"
            name="cc_number"
          />
        </li>
        <li :class="$style.field">
          <label for="cc_type">Card Type</label>
          <select id="cc_type" v-model="localForm.cc_type" name="cc_type">
            <option />
            <option value="Visa">Visa</option>
            <option value="Master Card">Master Card</option>
          </select>
        </li>
        <li :class="$style.field">
          <label for="cc_exp_month">Exp. Month</label>
          <input
            id="cc_exp_month"
            v-model="localForm.cc_exp_month"
            name="cc_exp_month"
          />
        </li>
        <li :class="$style.field">
          <label for="cc_exp_year">Exp. Year</label>
          <input
            id="cc_exp_year"
            v-model="localForm.cc_exp_year"
            name="cc_exp_year"
          />
        </li>
        <li :class="$style.field">
          <label for="cc_cid">CVV</label>
          <input id="cc_cid" v-model="localForm.cc_cid" name="cc_cid" />
        </li>
      </ul>
    </fieldset>
    <div :class="$style.actions">
      <transition name="fade">
        <div v-if="message" :class="$style.alert">
          {{ message }}
        </div>
      </transition>
      <button v-if="isDirty" @click.prevent="setDefault">Use Default</button>
      <button @click.prevent="saveUser">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['saveUser'],
  data() {
    return {
      message: '',
      isDirty: false,
      localForm: {},
    };
  },
  watch: {
    'localForm.email'(value) {
      this.localForm.username = value;
    },
    'localForm.password'(value) {
      this.localForm.confirm = value;
    },
    form: {
      handler() {
        this.updateForm();
      },
      immediate: true,
    },
    localForm: {
      handler() {
        this.isDirty = true;
      },
      deep: true,
    },
    message(value) {
      if (value) {
        setTimeout(() => {
          this.message = false;
        }, 5000);
      }
    },
  },
  methods: {
    updateForm() {
      const { isNew, ...formData } = this.form;
      Object.assign(this.localForm, formData);
      if (isNew) {
        this.message = 'User created';
        this.$nextTick(() => {
          this.isDirty = false;
        });
      }
    },

    setDefault() {
      this.message = 'User updated';
      this.isDirty = false;
      this.updateForm();
    },

    saveUser() {
      this.$emit('saveUser', this.localForm);
      this.message = 'Successfully saved';
    },
  },
};
</script>

<style lang="scss" module>
.form {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin: 0 -4%;
}

.formList {
  margin: 0;
  padding: 1em 0.5em 0;
  overflow: hidden;
}

.field {
  list-style: none;
  margin: 0 0 1em;
  position: relative;
  display: flex;
  width: 100%;
}

fieldset {
  border: none;
  padding: 1em;
  box-sizing: border-box;
  background: $c-bg;
  margin: 3em 4%;
  border-radius: 10px;
  border-top-left-radius: 0;
  position: relative;
  flex: 1 1 42%;
  width: 50%;
  min-width: em(320, 16);
}

legend {
  position: absolute;
  font: 500 em(18) / em(22, 18) $ff;
  top: -32px;
  left: 0;
  padding: 0.5em 2em;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: $c-bg;
}
.actions {
  margin: -1em 0 2em;
  box-sizing: border-box;
  flex: 1 0 100%;
  padding: 0 4%;
  display: flex;
  justify-content: end;

  &:first-of-type {
    margin: 2em 0;
  }
}
.alert {
  padding: 0 2em;
  border: 1px rgba($c-green, 0.5) solid;
  border-radius: 0.5em;
  background: rgba($c-green, 0.1);
  color: $c-green;
  display: flex;
  margin-right: auto;
  align-items: center;
}

label {
  box-sizing: border-box;
  font-size: $fz;
  line-height: 2.5;
  font-weight: 500;
  white-space: nowrap;
  padding: 0 1em 0 0;
  text-align: right;
  width: 40%;
}

.hint {
  font-size: 0.7em;
  position: absolute;
  opacity: 0;
  left: 100%;
  top: 100%;
  white-space: nowrap;
  padding: 0.1em 0 0;
  perspective: 300px;
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 1px);
  transition: all 0.5s ease-out 0.2s;
}

input,
select {
  color: #333;
  width: 60%;
  font: #{$fz}/#{em(40)} $ff;
  box-sizing: border-box;
  background: #fff;
  border: none;
  box-shadow: inset 0 0 2px $c-border;
  border-radius: 0.4em;
  padding: 0 1em;
  height: 2.5em;
  vertical-align: middle;
  transition: 200ms ease-out;
  &:focus {
    outline: none;
    box-shadow: inset 0 0 2px $c-border, 0 0 4px $c-border;
    + .hint {
      opacity: 0.9;
      transform: translate3d(-100%, 0, 10px);
    }
  }
}

select {
  -webkit-appearance: none;
}
</style>
