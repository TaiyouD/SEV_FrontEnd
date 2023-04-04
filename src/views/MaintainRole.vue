
  <template>
  <div>
    <v-img src="../assets/music-notes-bg1.jpg" max-height="100" />
    <v-container>
      <v-toolbar>
        <v-btn icon to="/maintain">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>User View</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-toolbar>
      <br />
      <v-card>
        <v-card-title>
        {{ "All Users" }}
        <v-icon class="ml-2">mdi-account-group</v-icon>
          <v-spacer></v-spacer>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary">
                {{ selectedRole || "All Users" }}
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="role in rolesList" :key="role" @click="filterRoles(role)">
                <v-list-item-title>{{ role }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn class="mx-2" color="success" @click="addRole(id)">Add User</v-btn>
        </v-card-title>
        <v-card-text>
          <b>{{ message }}</b>
        </v-card-text>
        <v-data-table :headers="headers" :items="filteredRoles" :search="search" :items-per-page="5" :sort-by="['roleType', 'fName']" :sort-desc="[false, false]">
          <template #item="{ item }">
            <tr>
              <td>{{ item.roleType }}</td>
              <td>{{ item.fName }}</td>
              <td>{{ item.lName }}</td>
              <td>{{ item.email }}</td>
              <td>
                <div class="d-flex justify-end">
                  <v-icon color="primary" @click="editRole(item)">mdi-pencil</v-icon>
                  <v-icon color="error" @click="deleteRole(item)">mdi-delete</v-icon>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import RoleServices from "../services/roleServices.js";
import UserServices from "../services/userServices.js";

export default {
  name: "maintainrole",
  props: ["id"],
  data() {
    return {
      search: "",
      roles: [],
      filteredRoles: [],
      rolesList: ["All Users", "Accompanist", "Admin", "Faculty", "Prospective Student", "Student"],
      selectedRole: null,
      message: "Add, Edit or Delete Users",
      headers: [
        { text: "Role", value: "roleType", sortable: false },
        { text: "First Name", value: "fName", sortable: false },
        { text: "Last Name", value: "lName", sortable: false },
        { text: "Email", value: "email", sortable: false }
      ],
    };
  },
  mounted() {
    this.retrieveRoles();
  },
  methods: {
    retrieveRoles() {
      RoleServices.getAll()
        .then((response) => {
          const roles = response.data;
          // Fetch user data for each role
          const promises = roles.map(role => {
            return UserServices.get(role.userId).then((userResponse) => {
              role.fName = userResponse.data.fName;
              role.lName = userResponse.data.lName;
              role.email = userResponse.data.email;
              return role;
            });
          });
          // Resolve all promises and update roles and filteredRoles
          Promise.all(promises).then((roles) => {
            this.roles = roles;
            this.filteredRoles = roles;
          }).catch((e) => {
            this.message = e.response.data.message;
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    filterRoles(role) {
      if (role === "All Users") {
        this.selectedRole = null;
        this.filteredRoles = this.roles;
      } else {
        this.selectedRole = role;
        this.filteredRoles = this.roles.filter((r) => r.roleType === role);
      }
    },
    addRole() {
      this.$router.push({ name: "addrole", params: { RoleId: this.id } });
    },
    editRole(role) {
      this.$router.push({ name: "editrole", params: { id: role.id } });
    },
    deleteRole(role) {
      if (confirm(`Are you sure you want to delete "${role.fName} ${role.lName}?`)) {
        RoleServices.delete(role.id)
          .then(() => {
            // Delete user record using the userId property in the role object
            UserServices.delete(role.userId)
              .then(() => {
                const index = this.roles.indexOf(role);
                this.roles.splice(index, 1);
                this.message = `${role.roleType} deleted successfully.`;

                // Remove the deleted role from filteredRoles as well
                this.filteredRoles = this.roles.filter(r => r.roleType === this.selectedRole || !this.selectedRole);
              })
              .catch((e) => {
                this.message = e.response.data.message;
              });
          })
          .catch((e) => {
            this.message = e.response.data.message;
          });
      }
    },
  },
};
</script>