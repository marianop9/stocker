import Button from '@/components/ui/button/Button.vue'
import type { IProductView } from '@/models/products'
import { createColumnHelper, type ColumnDef } from '@tanstack/vue-table'
import { h, type VNode } from 'vue'
import { RouterLink } from 'vue-router'

const colHelper = createColumnHelper<IProductView>()

export const productTableColumns = [
    colHelper.accessor('id', {}),
    colHelper.display({
        id: 'actions',
        cell: ({ row }) =>
            h(Button, { asChild: true }, () =>
                h(RouterLink, { to: '/products/' + row.getValue('id') }, 'Ver'),
            ),
    }),
    // {
    //     accessorKey: 'id',
    //     header: 'Id',
    //     cell: ({ row }) => row.getValue('id'),
    // },
    // {
    //     id: 'actions',
    //     cell: ({ row }) =>
    //         h(
    //             Button,
    //             { asChild: true },
    //             h(RouterLink, { to: '/products/' + row.getValue('id') }, 'Ver'),
    //         ),
    // },
    // colHelper.accessor('id', {
    //     header: () => h('div', { class: '' }, 'Id'),
    //     cell: ({ row }) => h('div', { class: 'font-medium' }, row.getValue('id')),
    // }),
    // colHelper.accessor('name', {
    //     header: () => 'Nombre',
    // }),
    // colHelper.accessor('categoryName', {
    //     header: () => 'Categoria',
    // }),
    // colHelper.accessor('providerName', {
    //     header: () => 'Proveedor',
    // }),
    // colHelper.display({
    //     id: 'actions',
    //     cell: ({ row })=>
    //         h(
    //             'div',
    //             // { asChild: true },
    //             {},
    //             'Ver',
    //             // h(RouterLink, { to: '/products' + row.getValue('id') }, 'Ver'),
    //         ),
    // }),
]
