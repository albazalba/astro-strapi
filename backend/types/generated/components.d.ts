import type { Schema, Attribute } from '@strapi/strapi';

export interface CommonCart extends Schema.Component {
  collectionName: 'components_common_carts';
  info: {
    displayName: 'cart';
    icon: 'shoppingCart';
  };
  attributes: {
    quantity: Attribute.Integer;
    product: Attribute.Relation<
      'common.cart',
      'oneToMany',
      'api::product.product'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'common.cart': CommonCart;
    }
  }
}
