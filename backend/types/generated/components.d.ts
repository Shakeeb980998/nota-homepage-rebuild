import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsColorVariants extends Struct.ComponentSchema {
  collectionName: 'components_sections_color_variants_sections';
  info: {
    displayName: 'Color Variants Section';
    icon: 'brush';
  };
  attributes: {
    variants: Schema.Attribute.Component<'shared.color-variant', true>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero Section';
    icon: 'star';
  };
  attributes: {
    ctaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Order Nota One'>;
    heroImage: Schema.Attribute.Media<'images'>;
    price: Schema.Attribute.String & Schema.Attribute.DefaultTo<'$300'>;
    titleLine1: Schema.Attribute.String & Schema.Attribute.Required;
    titleLine2: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsInsideTheBox extends Struct.ComponentSchema {
  collectionName: 'components_sections_inside_the_boxes';
  info: {
    displayName: 'Inside The Box Section';
    icon: 'archive';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.box-item', true>;
    leadText: Schema.Attribute.Text & Schema.Attribute.Required;
    titleLine1: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Inside'>;
    titleLine2: Schema.Attribute.String & Schema.Attribute.DefaultTo<'the box'>;
  };
}

export interface SectionsSmartPaper extends Struct.ComponentSchema {
  collectionName: 'components_sections_smart_papers';
  info: {
    displayName: 'Smart Paper Section';
    icon: 'file';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Works with'>;
    features: Schema.Attribute.JSON & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'smart paper'>;
  };
}

export interface SectionsSpecs extends Struct.ComponentSchema {
  collectionName: 'components_sections_specs';
  info: {
    displayName: 'Specs Section';
    icon: 'cog';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Nota pen'>;
    cards: Schema.Attribute.Component<'shared.spec-card', true>;
    penImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Specifications'>;
  };
}

export interface SectionsWhoItIsFor extends Struct.ComponentSchema {
  collectionName: 'components_sections_who_it_is_fors';
  info: {
    displayName: 'Who It Is For Section';
    icon: 'heart';
  };
  attributes: {
    audiences: Schema.Attribute.Component<'shared.audience-card', true>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    introQuote: Schema.Attribute.Text & Schema.Attribute.Required;
    sectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Who it's for:">;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SharedAudienceCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_audience_cards';
  info: {
    displayName: 'Audience Card';
    icon: 'user';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBoxItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_box_items';
  info: {
    displayName: 'Box Item';
    icon: 'cube';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedColorVariant extends Struct.ComponentSchema {
  collectionName: 'components_shared_color_variants';
  info: {
    displayName: 'Color Variant';
    icon: 'paint';
  };
  attributes: {
    hexColor: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    subtext: Schema.Attribute.String;
    tagline: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Meta tags for search engine optimization';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSpecCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_spec_cards';
  info: {
    displayName: 'Spec Card';
    icon: 'bulletList';
  };
  attributes: {
    features: Schema.Attribute.JSON & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'sections.color-variants': SectionsColorVariants;
      'sections.hero': SectionsHero;
      'sections.inside-the-box': SectionsInsideTheBox;
      'sections.smart-paper': SectionsSmartPaper;
      'sections.specs': SectionsSpecs;
      'sections.who-it-is-for': SectionsWhoItIsFor;
      'shared.audience-card': SharedAudienceCard;
      'shared.box-item': SharedBoxItem;
      'shared.color-variant': SharedColorVariant;
      'shared.seo': SharedSeo;
      'shared.spec-card': SharedSpecCard;
    }
  }
}
