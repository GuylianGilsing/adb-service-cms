import { mount } from '@vue/test-utils';

import RollerCoasterOverviewTable from '@/components/RollerCoasterOverviewTable.vue';

test('That the table only displays a preloader when there is no data.', async () => {
    // Arrange
    const wrapper = mount(RollerCoasterOverviewTable);
    
    // Act
    await wrapper.setProps({
        rollerCoasters: []
    });

    await wrapper.setData({
        preloading: true
    });

    // Assert
    const table = wrapper.find('[data-ut="table-rollercoaster-overview"]');
    const emptyRow = table.find('.table__row--table-empty');
    const preloadingRow = table.find('.table__row--table-preloading');

    expect(emptyRow.isVisible()).toBe(false);
    expect(preloadingRow.isVisible()).toBe(true);
});

test('That the table only displays a preloader when there is data.', async () => {
    // Arrange
    const wrapper = mount(RollerCoasterOverviewTable);
    
    // Act
    await wrapper.setProps({
        rollerCoasters: [
            {
                id: 1,
                name: 'test',
                park: 'test'
            }
        ]
    });

    await wrapper.setData({
        preloading: true
    });

    // Assert
    const table = wrapper.find('[data-ut="table-rollercoaster-overview"]');
    const emptyRow = table.find('.table__row--table-empty');
    const preloadingRow = table.find('.table__row--table-preloading');

    expect(table.findAll('.table__actions').length).toBe(0);

    expect(emptyRow.isVisible()).toBe(false);
    expect(preloadingRow.isVisible()).toBe(true);
});

test('That the table displays a "No RollerCoasters found" message if it doesn\'t have any data.', async () => {
    // Arrange
    const wrapper = mount(RollerCoasterOverviewTable);
    
    // Act
    await wrapper.setProps({
        rollerCoasters: []
    });

    // Assert
    const table = wrapper.find('[data-ut="table-rollercoaster-overview"]');
    const emptyRow = table.find('.table__row--table-empty');
    const preloadingRow = table.find('.table__row--table-preloading');

    expect(emptyRow.text()).toBe("No RollerCoasters found");
    expect(emptyRow.isVisible()).toBe(true);
    expect(preloadingRow.isVisible()).toBe(false);
});
