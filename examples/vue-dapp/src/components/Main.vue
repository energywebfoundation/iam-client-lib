<template>
  <div>
    <div v-if="isLoading">
      <Spinner />
      <span>
        Loading... (Please sign messages using your connected wallet)
      </span>
    </div>
    <div v-else-if="did">
      <p>Hello user!</p>
      <p>
        Your decentralised identifier: <strong>{{ did }}</strong>
      </p>
      <div v-if="roles.length > 0" class="rolesContainer">
        <p>This are your validated roles:</p>
        <p v-for="role in roles" v-bind:key="role.name">
          <strong>{{ role.name }}</strong> at {{ role.namespace }}
        </p>
      </div>
      <div v-else>
        You do not have any issued role at the moment, please login into switchboard and search for
        apps, orgs to enrol.
      </div>
      <div class="logoutContainer">
        <button @click="logout" class="button">
          <span>Logout</span>
        </button>
      </div>
    </div>
    <div v-else class="container">
      <button @click="loginWithWalletConnect" class="button">
        <img class="walletconnect" src="../assets/wallet-connect-icon.svg" />
        <span>Login with Wallect Connect</span>
      </button>
      <button @click="loginWithMetamask" class="button">
        <img class="metamask" src="../assets/metamask-logo.svg" />
        <span>Login with Metamask</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Spinner from "./Spinner.vue";
import axios from "axios";

type Role = {
  name: string;
  namespace: string;
};

type User = {
  did: string;
  verifiedRoles: Role[];
};

export default Vue.extend({
  name: "Main",
  components: {
    Spinner
  },
  data: function() {
    return {
      isLoading: false,
      did: "",
      roles: [] as Role[]
    };
  },
  methods: {
    verifyIdentity: async function() {
      const signer = this.$IAM.getSigner();
      const latestBlock = await signer?.provider?.getBlockNumber();
      const claim = await this.$IAM.createPublicClaim({
        data: { blockNumber: latestBlock }
      });
      const { data } = await axios.post<{ token: string }>(
        "https://did-auth-demo.energyweb.org/login",
        {
          claim
        }
      );
      const config = {
        headers: { Authorization: `Bearer ${data.token}` }
      };
      const { data: roles } = await axios.get<Role[]>(
        "https://did-auth-demo.energyweb.org/roles",
        config
      );
      this.roles = roles;
    },
    loginWithWalletConnect: async function() {
      this.isLoading = true;
      const { did } = await this.$IAM.initializeConnection();
      if (did) {
        this.did = did;
        try {
          await this.verifyIdentity();
        } catch (err) {
          this.isLoading = false;
        }
      }
      this.isLoading = false;
    },
    loginWithMetamask: async function() {
      this.isLoading = true;
      const { did } = await this.$IAM.initializeConnection({
        useMetamaskExtension: true
      });
      if (did) {
        this.did = did;
        try {
          await this.verifyIdentity();
        } catch (err) {
          this.isLoading = false;
        }
      }
      this.isLoading = false;
    },
    logout: function() {
      this.did = "";
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
.rolesContainer {
  margin-top: 24px;
}
.logoutContainer {
  display: flex;
  justify-content: center;
}
.button {
  background-color: #42b883;
  padding: 20px 24px;
  margin: 8px;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #3b9d71;
  }

  img {
    margin-right: 16px;
  }

  .metamask {
    height: 36px;
    width: 36px;
  }

  .walletconnect {
    height: 48px;
    width: 48px;
  }
}
</style>
