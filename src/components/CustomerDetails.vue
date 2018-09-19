<template>
  <div class="m-15">
    <StyledTitle>SUBMIT YOUR DETAILS</StyledTitle>
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
import { StyledTitle, Wrapper } from "./styles.js";

export default {
  name: "BuyNowCustomerDetails",
  props: {
    msg: String
  },
  components: {
    StyledTitle,
    Wrapper
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
