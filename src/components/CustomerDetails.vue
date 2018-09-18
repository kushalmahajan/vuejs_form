<template>
  <div class="m-15">
    <md-card>
      <md-card-header>
        <div class="md-title">SUBMIT YOUR DETAILS</div>
        <!-- <div class="md-subhead">Created by Kushal</div> -->
      </md-card-header>
      <form id='myForm'  @submit.prevent="handleSubmit">
        <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-50">
                  <md-field>
                    <label for="product">Product</label>
                    <md-select v-model="form.product" name="product" id="product">
                        <md-option :key='0'>Select product</md-option>
                        <md-option v-for='product in products' :key='product.code' :value='product.code'>{{product.name}}</md-option>
                      </md-select>
                  </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                  <md-field>
                      <label for="dmscode">DMS code</label>
                      <md-select v-model="form.dmscode" name="dmscode" id="dmscode">
                        <md-option :key='0'>Select DMS Code</md-option>
                        <md-option v-for='dmscode in dmscodes' :key='dmscode.code' :value='dmscode.code'>{{dmscode.name}}</md-option>
                      </md-select>
                  </md-field> 
              </div>
              <div class="md-layout-item md-size-100">
                  <md-field>
                      <label for="fullname">Full Name</label>
                      <md-input v-model="form.fullname" name="fullname"></md-input>
                  </md-field>  
              </div>
              <div class="md-layout-item md-size-50">
                  <md-field>
                      <label for="gender">Gender</label>
                      <md-select v-model="form.gender" name="gender" id="gender">
                        <md-option :key='0'>Select Gender</md-option>
                        <md-option v-for='item in gender' :key='item' :value='item'>{{`${item.charAt(0).toUpperCase()}${item.slice(1)}`}}</md-option>
                      </md-select>
                  </md-field>
              </div>
              <div class="md-layout-item md-size-50">
                  <md-datepicker v-model="form.dob">
                      <label for="dob">Date of Birth</label>
                  </md-datepicker>
              </div>
              <div class="md-layout-item md-size-50">
                  <md-field>
                      <label for="mobile">Mobile</label>
                      <md-input v-model="form.mobile" name="mobile"></md-input>
                  </md-field>  
              </div>
              <div class="md-layout-item md-size-50">
                  <md-field>
                      <label for="email">Email</label>
                      <md-input type='email' v-model="form.email" name="email"></md-input>
                  </md-field>  
              </div>
              <div class="md-layout-item md-size-50">
                  <md-field>
                      <label for="annual_income">Annual Income ( in lacs ) </label>
                      <md-input type='number' min='200000' max='10000000' v-model="form.annual_income" name="annual_income"></md-input>
                  </md-field>  
              </div>
              <div class="md-layout-item md-size-50">
                  <md-field>
                      <label for="occupation">Occupation</label>
                       <md-select v-model="form.occupation" name="occupation" id="occupation">
                        <md-option :key='0'>Select Occupation</md-option>
                        <md-option v-for='item in occupation' :key='item.name' :value='item.name'>{{`${item.name.charAt(0).toUpperCase()}${item.name.slice(1)}`}}</md-option>
                      </md-select>
                  </md-field>  
              </div>
              
            </div>
            <p  class='errors' v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors" :key='error'>{{ error }}</li>
              </ul>
            </p>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-default md-dense">Submit</md-button>
        </md-card-actions>
      </form>      
    </md-card>

  </div>
</template>

<script>
import {
  dmscodes,
  products,
  gender,
  incomeSlabs,
  occupation
} from "../constants.js";

import { serialize } from "../util.js";

export default {
  name: "BuyNowCustomerDetails",
  props: {
    msg: String
  },
  data() {
    const params = new URL(location).searchParams;
    const source =
      typeof location.search == "string" && location.search.trim().length > 0
        ? params.get("source")
        : false;

    const DMSMapping = dmscodes[source] || [];
    return {
      form: {
        dmscode: null,
        product: null,
        fullname: null,
        gender: null,
        dob: null,
        mobile: null,
        email: null,
        annual_income: null,
        occupation: null
      },
      dmscodes: DMSMapping,
      products,
      gender,
      incomeSlabs,
      occupation,
      errors: []
    };
  },
  methods: {
    checkForm: function(e) {
      const {
        product,
        dmscode,
        fullname,
        gender,
        dob,
        mobile,
        email,
        occupation
      } = this.form;
      if (
        product &&
        dmscode &&
        fullname &&
        gender &&
        dob &&
        email &&
        mobile &&
        occupation
      ) {
        this.errors = [];
        return true;
      }

      this.errors = [];

      if (!product) {
        this.errors.push("Product required");
      }
      if (!dmscode) {
        this.errors.push("DMS code required");
      }
      if (!fullname) {
        this.errors.push("Fullname is required");
      }
      if (!gender) {
        this.errors.push("Gender is required");
      }
      if (!dob) {
        this.errors.push("DOB is required");
      }
      if (!mobile) {
        this.errors.push("Mobile is required");
      } else if (mobile && mobile.length !== 10) {
        this.errors.push("Mobile should be 10 digit");
      }

      if (!email) {
        this.errors.push("Email is required");
      }
      if (!occupation) {
        this.errors.push("Occupation is required");
      }
      e.preventDefault();
    },
    handleSubmit: function(e) {
      const {
        product,
        dmscode,
        fullname,
        gender,
        dob,
        mobile,
        email,
        annual_income,
        occupation
      } = this.form;

      if (this.checkForm(e)) {
        this.errors = [];
        const day = dob.getDate();
        let month = dob.getMonth() + 1;
        const year = dob.getFullYear();
        if (month < 10) {
          month = `0${month}`;
        }
        const date_of_birth = `${day}-${month}-${year}`;
        let payload = {
          productid: product,
          source: "tpp",
          name: fullname.split(" ").join("-"),
          mobile,
          flowtype: "DIRECT",
          sourcekey: "",
          email,
          city: "324",
          income: annual_income,
          dob: date_of_birth,
          Gender: gender === "male" ? "M" : "F",
          Issmoker: "no",
          Occupation: occupation,
          utm_source: "",
          utm_campaign: "",
          dms: dmscode
        };
        payload = serialize(payload);
        window.location = `https://www.aegonlife.com/product/imax/imax-insurance-online?${payload}`;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-card {
  background: #c0e6ee url(../assets/bg-patch.png) no-repeat right bottom;
}
.m-15 {
  margin: 15px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.md-subhead,
.md-title {
  text-align: left;
}
.errors {
  color: rgb(214, 74, 74);
}
</style>
