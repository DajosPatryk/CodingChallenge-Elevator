<template>
  <v-table
      class="shopping-list full-width--dynamic center-horizontal"
      density="compact"
  >
    <thead>
    <tr>
      <th class="text-left">
        <div
            class="checkbox"
            @click="toggleHeader"
        >
          <v-icon v-if="shoppingList.done">
            mdi-checkbox-outline
          </v-icon>
          <v-icon v-else>
            mdi-checkbox-blank-outline
          </v-icon>
        </div>
      </th>
      <th class="text-left">
        {{ $t('quantity') }} & {{ $t('name') }}
      </th>
      <th class="text-left">
        {{ $t('due') }}
      </th>
      <th class="text-left"/>
    </tr>
    </thead>
    <tbody>
    <template v-for="item in shoppingList.list" :key="item.id">
      <tr
          :class="`item ${item.done ? 'done' : ''}`"
      >
        <td>
          <div
              class="checkbox"
              @click="toggleItem(item.id)"
          >
            <v-icon v-if="item.done">
              mdi-checkbox-outline
            </v-icon>
            <v-icon v-else>
              mdi-checkbox-blank-outline
            </v-icon>
          </div>
        </td>
        <td
            class="wrap"
        >
          {{ item.quantity }}x {{ item.name }}
        </td>
        <td>{{ isodateToDate(item.dueDate) }}</td>
        <td>
          <v-btn
              class="btn-action"
              variant="text"
              @click="editItem(item.id)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
              class="btn-action"
              variant="text"
              @click="deleteItem(item.id)"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <tr>
      <td>
        <v-btn
            class="btn-action"
            variant="text"
            @click="addItem"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </td>
    </tr>
    </tbody>
    <v-dialog
        class="full-width--dynamic"
        v-model="productDialog.toggle"
        persistent
    >
      <EditProductDialog
          v-if="productDialog.toggle"
          @submitted="updateItem"
          @deleted="deleteItem"
          :productProp="productDialog.item"
      />
    </v-dialog>
  </v-table>
</template>

<script>
import {setKey,getKey} from "@/utils/localstorageController";
import EditProductDialog from "@/components/EditProductDialog.vue";
import {isodateToDate} from "@/utils/dateFormatter";
import {UUIDv4} from "@/utils/idFactory";

export default {
  name: "ShoppingListView",
  components:{
    EditProductDialog
  },
  data() {
    return {
      shoppingList: {
        done: false,
        list: []
      },
      productDialog: {
        toggle: false,
        item: null
      },
      model: {
        item: {
          id: null,
          name: null,
          quantity: 1,
          dueDate: null,
          done: false
        }
      }
    }
  },
  methods: {
    /**
     * Saves shoppingList list to local storage.
     */
    save(){
      setKey("shoppingList", this.shoppingList.list);
    },
    /**
     * Loads shoppingList list from local storage.
     */
    load(){
      this.shoppingList.list = getKey("shoppingList") ? getKey("shoppingList") : [];
    },
    /**
     * Deletes an item from the shopping list by its ID.
     * @param {string} id - The unique identifier of the item to delete.
     */
    deleteItem(id) {
      this.shoppingList.list = this.shoppingList.list.filter(item => item.id !== id);
      this.productDialog.toggle = false;

      this.save();
    },
    /**
     * Adds a new item to the shopping list based on model.
     */
    addItem() {
      const newItem = JSON.parse(JSON.stringify(this.model.item));  // Deep copy
      newItem.id = this.UUIDv4();
      newItem.dueDate = new Date().toISOString().slice(0, 10);

      this.shoppingList.list.push(newItem);
      this.editItem(newItem.id);

      this.save();
    },
    /**
     * Opens a dialog editing an existing item.
     * @param {string} id - The unique identifier of the item to edit.
     */
    editItem(id){
      this.productDialog.item = this.shoppingList.list.find(el => el.id === id);

      this.productDialog.toggle = true;
    },
    /**
     * Updates an item.
     * @param {Object} obj - The item to update as object.
     */
    updateItem(obj){
      const index = this.shoppingList.list.findIndex(el => el.id === obj.id);
      this.shoppingList.list[index] = obj;

      this.productDialog.toggle = false;

      this.save();
    },
    /**
     * Flips the toggle of an existing item.
     * @param {string} id - The unique identifier of the item to edit.
     */
    toggleItem(id){
      const index = this.shoppingList.list.findIndex(el => el.id === id);
      this.shoppingList.list[index].done = !this.shoppingList.list[index].done;

      this.save();
    },
    /**
     * Flips the toggle in the list header and all shoppingList items.
     */
    toggleHeader(){
      this.shoppingList.done = !this.shoppingList.done;
      this.shoppingList.list.map(el => el.done = this.shoppingList.done);

      this.save();
    },
    isodateToDate,
    UUIDv4
  },
  mounted(){
    this.load();
  }
};
</script>
<style lang="scss">
.full-width--dynamic {
  max-width: 100vw;
}

@media screen and (min-width: 1200px) {
  .full-width--dynamic {
    max-width: 50vw !important;
  }
}

.shopping-list .btn-action {
  margin: calc(.1rem + .2vw);
}

.shopping-list .checkbox {
  cursor:pointer;
}

.shopping-list .item {
  transition: opacity .2s ease-out;
}

.shopping-list .item.done {
  opacity:.4;
}
</style>
