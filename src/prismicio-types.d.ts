import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type CaseStudyDocumentDataSlicesSlice = SectionHeadingSlice | TextBlockSlice | ImageBlockSlice | BeforeAfterSlice | StatSlice

/**
 * Item in *Case Study → ジャンル*
 */
export interface CaseStudyDocumentDataGenreItem {
	/**
	 * ジャンル名 field in *Case Study → ジャンル*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.genre[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
}

/**
 * Content for Case Study documents
 */
interface CaseStudyDocumentData {
	/**
	 * Slice Zone field in *Case Study*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<CaseStudyDocumentDataSlicesSlice>;
	
	/**
	 * タイトル field in *Case Study*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * 表紙画像 field in *Case Study*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.cover
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	cover: prismic.ImageField<never>;
	
	/**
	 * Introduction field in *Case Study*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.initial
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	initial: prismic.RichTextField;
	
	/**
	 * 年 field in *Case Study*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.year
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	year: prismic.NumberField;
	
	/**
	 * クライアント field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.client
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	client: prismic.KeyTextField;
	
	/**
	 * 担当 field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.role
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	role: prismic.KeyTextField;
	
	/**
	 * 使用ツール field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.tools
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tools: prismic.KeyTextField;
	
	/**
	 * チーム field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.team
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	team: prismic.KeyTextField;
	
	/**
	 * 公開URL field in *Case Study*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * ジャンル field in *Case Study*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.genre[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	genre: prismic.GroupField<Simplify<CaseStudyDocumentDataGenreItem>>;
	
	/**
	 * 公開する field in *Case Study*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.on_off
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	on_off: prismic.BooleanField;/**
	 * Meta Title field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: case_study.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: case_study.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Case Study*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Case Study document from Prismic
 *
 * - **API ID**: `case_study`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CaseStudyDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<CaseStudyDocumentData>, "case_study", Lang>;

type PageDocumentDataSlicesSlice = HeroSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;
	
	/**
	 * Title field in *Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;/**
	 * Meta Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Item in *portfolio → Video*
 */
export interface PortfolioDocumentDataVideoItem {
	/**
	 * video field in *portfolio → Video*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.video[].video
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	video: prismic.EmbedField
}

/**
 * Item in *portfolio → genre*
 */
export interface PortfolioDocumentDataGenreItem {
	/**
	 * genre field in *portfolio → genre*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.genre[].genre
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	genre: prismic.SelectField<"BRANDING" | "WEB/UIUX" | "ClientWork" | "TYPEFACES" | "GRAPHIC" | "DRAWING" | "Experimental Work">;
}

/**
 * Item in *portfolio → portfoliophotos*
 */
export interface PortfolioDocumentDataPortfoliophotosItem {
	/**
	 * des field in *portfolio → portfoliophotos*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.portfoliophotos[].des
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	des: prismic.RichTextField;
	
	/**
	 *  video field in *portfolio → portfoliophotos*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.portfoliophotos[].video
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	video: prismic.EmbedField
	
	/**
	 * photos field in *portfolio → portfoliophotos*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.portfoliophotos[].photos
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photos: prismic.ImageField<never>;
	
	/**
	 * before (beta) field in *portfolio → portfoliophotos*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.portfoliophotos[].photos_before
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photos_before: prismic.ImageField<never>;
}

/**
 * Content for portfolio documents
 */
interface PortfolioDocumentData {
	/**
	 * on off field in *portfolio*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: true
	 * - **API ID Path**: portfolio.on_off
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	on_off: prismic.BooleanField;
	
	/**
	 * date field in *portfolio*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	date: prismic.DateField;
	
	/**
	 * title field in *portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * initial field in *portfolio*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.initial
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	initial: prismic.RichTextField;
	
	/**
	 * Video field in *portfolio*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.video[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	video: prismic.GroupField<Simplify<PortfolioDocumentDataVideoItem>>;
	
	/**
	 * front cover field in *portfolio*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.portfolio
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	portfolio: prismic.ImageField<never>;
	
	/**
	 * genre field in *portfolio*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.genre[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	genre: prismic.GroupField<Simplify<PortfolioDocumentDataGenreItem>>;
	
	/**
	 * portfoliophotos field in *portfolio*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.portfoliophotos[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	portfoliophotos: prismic.GroupField<Simplify<PortfolioDocumentDataPortfoliophotosItem>>;
	
	/**
	 * Link field in *portfolio*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * year field in *portfolio*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.year
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	year: prismic.NumberField;
	
	/**
	 * role field in *portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.role
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	role: prismic.KeyTextField;
	
	/**
	 * client field in *portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.client
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	client: prismic.KeyTextField;
	
	/**
	 * tools field in *portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.tools
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tools: prismic.KeyTextField;
	
	/**
	 * team field in *portfolio*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: portfolio.team
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	team: prismic.KeyTextField;
}

/**
 * portfolio document from Prismic
 *
 * - **API ID**: `portfolio`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PortfolioDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PortfolioDocumentData>, "portfolio", Lang>;

export type AllDocumentTypes = CaseStudyDocument | PageDocument | PortfolioDocument;

/**
 * Primary content in *Before After → Default → Primary*
 */
export interface BeforeAfterSliceDefaultPrimary {
	/**
	 * 指標名 field in *Before After → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 診断完了率
	 * - **API ID Path**: before_after.default.primary.metric
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	metric: prismic.KeyTextField;
	
	/**
	 * Before の数値 field in *Before After → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 42%
	 * - **API ID Path**: before_after.default.primary.before_value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	before_value: prismic.KeyTextField;
	
	/**
	 * After の数値 field in *Before After → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 63%
	 * - **API ID Path**: before_after.default.primary.after_value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	after_value: prismic.KeyTextField;
	
	/**
	 * Before 画像 (ベータ) field in *Before After → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: before_after.default.primary.before_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	before_image: prismic.ImageField<never>;
	
	/**
	 * After 画像 (本番) field in *Before After → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: before_after.default.primary.after_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	after_image: prismic.ImageField<never>;
	
	/**
	 * 何を変えたか field in *Before After → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: before_after.default.primary.note
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	note: prismic.RichTextField;
}

/**
 * Default variation for Before After Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BeforeAfterSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BeforeAfterSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Before After*
 */
type BeforeAfterSliceVariation = BeforeAfterSliceDefault

/**
 * Before After Shared Slice
 *
 * - **API ID**: `before_after`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BeforeAfterSlice = prismic.SharedSlice<"before_after", BeforeAfterSliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Heading field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Body field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Item in *Image Block → Default → Primary → 画像*
 */
export interface ImageBlockSliceDefaultPrimaryImagesItem {
	/**
	 * 画像 field in *Image Block → Default → Primary → 画像*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_block.default.primary.images[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * キャプション field in *Image Block → Default → Primary → 画像*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_block.default.primary.images[].caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Item in *Image Block → Annotated → Primary → 画像*
 */
export interface ImageBlockSliceAnnotatedPrimaryImagesItem {
	/**
	 * 画像 field in *Image Block → Annotated → Primary → 画像*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_block.annotated.primary.images[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * 注釈 field in *Image Block → Annotated → Primary → 画像*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_block.annotated.primary.images[].caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	caption: prismic.KeyTextField;
}

/**
 * Primary content in *Image Block → Default → Primary*
 */
export interface ImageBlockSliceDefaultPrimary {
	/**
	 * 画像 field in *Image Block → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_block.default.primary.images[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	images: prismic.GroupField<Simplify<ImageBlockSliceDefaultPrimaryImagesItem>>;
}

/**
 * Default variation for Image Block Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageBlockSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ImageBlockSliceDefaultPrimary>, never>;

/**
 * Primary content in *Image Block → Annotated → Primary*
 */
export interface ImageBlockSliceAnnotatedPrimary {
	/**
	 * 画像 field in *Image Block → Annotated → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_block.annotated.primary.images[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	images: prismic.GroupField<Simplify<ImageBlockSliceAnnotatedPrimaryImagesItem>>;
}

/**
 * Annotated variation for Image Block Slice
 *
 * - **API ID**: `annotated`
 * - **Description**: Annotated
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageBlockSliceAnnotated = prismic.SharedSliceVariation<"annotated", Simplify<ImageBlockSliceAnnotatedPrimary>, never>;

/**
 * Slice variation for *Image Block*
 */
type ImageBlockSliceVariation = ImageBlockSliceDefault | ImageBlockSliceAnnotated

/**
 * Image Block Shared Slice
 *
 * - **API ID**: `image_block`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageBlockSlice = prismic.SharedSlice<"image_block", ImageBlockSliceVariation>;

/**
 * Primary content in *Section Heading → Default → Primary*
 */
export interface SectionHeadingSliceDefaultPrimary {
	/**
	 * 番号 (01〜08) field in *Section Heading → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 01
	 * - **API ID Path**: section_heading.default.primary.number
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	number: prismic.KeyTextField;
	
	/**
	 * セクション名 (英語) field in *Section Heading → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Strategy & ICP
	 * - **API ID Path**: section_heading.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * 太字の一文 field in *Section Heading → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: section_heading.default.primary.lead
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	lead: prismic.RichTextField;
}

/**
 * Default variation for Section Heading Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SectionHeadingSliceDefault = prismic.SharedSliceVariation<"default", Simplify<SectionHeadingSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Section Heading*
 */
type SectionHeadingSliceVariation = SectionHeadingSliceDefault

/**
 * Section Heading Shared Slice
 *
 * - **API ID**: `section_heading`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SectionHeadingSlice = prismic.SharedSlice<"section_heading", SectionHeadingSliceVariation>;

/**
 * Item in *Stat → Default → Primary → 数値*
 */
export interface StatSliceDefaultPrimaryStatsItem {
	/**
	 * 数値 field in *Stat → Default → Primary → 数値*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 63%
	 * - **API ID Path**: stat.default.primary.stats[].value
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	value: prismic.KeyTextField;
	
	/**
	 * ラベル field in *Stat → Default → Primary → 数値*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 診断完了率
	 * - **API ID Path**: stat.default.primary.stats[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * 補足 (任意) field in *Stat → Default → Primary → 数値*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 42% → 63%
	 * - **API ID Path**: stat.default.primary.stats[].note
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	note: prismic.KeyTextField;
}

/**
 * Primary content in *Stat → Default → Primary*
 */
export interface StatSliceDefaultPrimary {
	/**
	 * 数値 field in *Stat → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: stat.default.primary.stats[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	stats: prismic.GroupField<Simplify<StatSliceDefaultPrimaryStatsItem>>;
}

/**
 * Default variation for Stat Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatSliceDefault = prismic.SharedSliceVariation<"default", Simplify<StatSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Stat*
 */
type StatSliceVariation = StatSliceDefault

/**
 * Stat Shared Slice
 *
 * - **API ID**: `stat`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type StatSlice = prismic.SharedSlice<"stat", StatSliceVariation>;

/**
 * Primary content in *Text Block → Default → Primary*
 */
export interface TextBlockSliceDefaultPrimary {
	/**
	 * 本文 field in *Text Block → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: text_block.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Default variation for Text Block Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextBlockSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TextBlockSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Text Block*
 */
type TextBlockSliceVariation = TextBlockSliceDefault

/**
 * Text Block Shared Slice
 *
 * - **API ID**: `text_block`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TextBlockSlice = prismic.SharedSlice<"text_block", TextBlockSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			CaseStudyDocument,
			CaseStudyDocumentData,
			CaseStudyDocumentDataSlicesSlice,
			CaseStudyDocumentDataGenreItem,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			PortfolioDocument,
			PortfolioDocumentData,
			PortfolioDocumentDataVideoItem,
			PortfolioDocumentDataGenreItem,
			PortfolioDocumentDataPortfoliophotosItem,
			AllDocumentTypes,
			BeforeAfterSlice,
			BeforeAfterSliceDefaultPrimary,
			BeforeAfterSliceVariation,
			BeforeAfterSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			ImageBlockSlice,
			ImageBlockSliceDefaultPrimaryImagesItem,
			ImageBlockSliceDefaultPrimary,
			ImageBlockSliceAnnotatedPrimaryImagesItem,
			ImageBlockSliceAnnotatedPrimary,
			ImageBlockSliceVariation,
			ImageBlockSliceDefault,
			ImageBlockSliceAnnotated,
			SectionHeadingSlice,
			SectionHeadingSliceDefaultPrimary,
			SectionHeadingSliceVariation,
			SectionHeadingSliceDefault,
			StatSlice,
			StatSliceDefaultPrimaryStatsItem,
			StatSliceDefaultPrimary,
			StatSliceVariation,
			StatSliceDefault,
			TextBlockSlice,
			TextBlockSliceDefaultPrimary,
			TextBlockSliceVariation,
			TextBlockSliceDefault
		}
	}
}