<template>
  <v-card
      class="component dialog"
      :title="$t('editProduct')"
  >
    <v-card-text>
      <v-form v-model="isFormValid">
        <v-row>
          <v-col>
            <v-text-field
                variant="underlined"
                v-model="product.name"
                :label="$t('name')"
                :rules="[() => !!product.name || $t('requiredField')]"
            />
          </v-col>
          <v-col>
            <v-text-field
                variant="underlined"
                v-model="product.quantity"
                :label="$t('quantity')"
                type="number"
                :rules="[() => !!product.quantity || $t('requiredField')]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                variant="underlined"
                v-model="product.dueDate"
                :label="$t('due')"
                type="date"
                :rules="[() => !!product.dueDate || $t('requiredField')]"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
          variant="tonal"
          color="success"
          :disabled="!isFormValid"
          @click="submit"
      >
        {{ $t('apply') }}
      </v-btn>
      <v-btn
          variant="tonal"
          color="error"
          @click="this.delete"
      >
        {{ $t('delete') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "EditProductDialog",

  props: {
    productProp: Object
  },
  data() {
    return {
      product: {
        id: null,
        name: null,
        quantity: null,
        dueDate: null,
        done: null
      },
      isFormValid: false,
    }
  },
  methods: {
    /**
     * Submits dialog and returns object.
     */
    submit() {
      this.$emit("submitted", this.product);
    },
    /**
     * Sends deletion emit and returns object id.
     */
    delete() {
      this.$emit("deleted", this.product.id);
    },
  },
  mounted() {
    this.product = this.productProp;
  }
};
</script>
<style lang="scss">
.component.dialog {
  padding: calc(0.25rem + 0.5vw + 0.5vh);
}
</style>
