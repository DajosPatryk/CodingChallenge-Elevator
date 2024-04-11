import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import ShoppingListView from '@/views/ShoppingListView.vue';
import EditProductDialog from '@/components/EditProductDialog.vue';

jest.mock("@/utils/localstorageController", () => ({
    setKey: jest.fn(),
    getKey: jest.fn().mockReturnValue([])
}));

describe('ShoppingListView.vue', () => {
    let wrapper;

    // Setting mock environment
    beforeEach(() => {
        wrapper = shallowMount(ShoppingListView, {
            global: {
                mocks: {
                    $t: (msg) => msg, // Mocked i18n
                },
                stubs: {
                    EditProductDialog: true
                }
            }
        });
    });
    afterEach(() => {
        wrapper.unmount();
    });

    it('loads items from local storage on mount', async () => {
        // Loading items and testing outcome
        expect(wrapper.vm.shoppingList.list).toEqual([]);
    });

    it('adds a new item to the shopping list', async () => {
        // Adding item and testing outcome
        wrapper.vm.addItem();
        await nextTick();
        expect(wrapper.vm.shoppingList.list.length).toBeGreaterThan(0);
    });

    it('deletes an item from the shopping list', async () => {
        // Adding item
        wrapper.vm.addItem();
        await nextTick();
        const itemId = wrapper.vm.shoppingList.list[0].id;

        // Deleting item and testing outcome
        wrapper.vm.deleteItem(itemId);
        await nextTick();
        expect(wrapper.vm.shoppingList.list.find(item => item.id === itemId)).toBeUndefined();
    });

    it('toggles an items "done" status', async () => {
        // Adding item
        wrapper.vm.addItem();
        await nextTick();
        const item = wrapper.vm.shoppingList.list[0];

        // Testing outcome
        wrapper.vm.toggleItem(item.id);
        await nextTick();
        expect(item.done).toBe(true);
    });

    it('updates an item in the shopping list', async () => {
        // Adding item
        wrapper.vm.addItem();
        await nextTick();
        const updatedItem = { ...wrapper.vm.shoppingList.list[0], name: 'Updated Name' };

        // Updating item and testing outcome
        wrapper.vm.updateItem(updatedItem);
        await nextTick();
        expect(wrapper.vm.shoppingList.list[0].name).toBe('Updated Name');
    });

    it('toggles all items as done when header checkbox is clicked', async () => {
        // Adding items
        wrapper.vm.addItem();
        wrapper.vm.addItem();
        await nextTick();

        // Testing outcome
        wrapper.vm.toggleHeader();
        await nextTick();
        expect(wrapper.vm.shoppingList.list.every(item => item.done)).toBe(true);
    });
});