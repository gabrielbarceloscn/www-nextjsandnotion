import Page from "../components/page";
import PageHeader from "../components/page-header";
import {Box, Link, Text} from "@chakra-ui/react";
import Image from "next/image";
import {formatDate} from "../lib/formatDate";
import {getDatabase} from "../lib/notionApi";
import slugify from "slugify";
import {NextSeo} from "next-seo";
import cloudinaryCustomLoader from "../lib/imgCustomLoader";

const BlogListItem = (props) => {
    const title = props.properties.Title.title[0]?.plain_text;
    const slug = slugify(title, {lower: true});

    const description = props.properties.Description.rich_text[0]?.plain_text;

    const publishedAt = props.properties.PublishDate?.date.start;
    const updatedAt = props.last_edited_time;

    const link = props.properties.Link?.url;
    const cover = props?.cover?.file?.url;
    const status = props.properties.Status.select.name;
    const tags = props.properties.Tags.multi_select?.map(c => c.name);

    return (
        <Box mb={"4rem"}>
            {/*Post image cover wrapper*/}
            {cover && <a href={`/blog/${slug}/`}>
                <Box
                    marginLeft={{base: "-15px", sm: "-20px"}}
                    marginRight={{base: "-15px", sm: "-20px"}}
                    marginBottom={["15px", "30px"]}
                    overflow={"hidden"}
                    border={"1px solid var(--border)"}
                    borderRadius={{sm: "12px"}}
                    borderWidth={{sm: "1px"}}
                    borderRightWidth={0}
                    borderLeftWidth={0}
                >
                    <Image src={cover} loader={cloudinaryCustomLoader} alt={"alt"} width={2024} height={1012} layout={"responsive"}/>
                </Box>
            </a>}
            <Link href={`/blog/${slug}/`}
                  display={"block"}
                  marginBottom={"10px"}
                  colorScheme={"brand"}
                  fontWeight={"700"}
                  fontSize={["20px", "22px"]}
            >
                {title}
            </Link>
            <Text mb={"10px"} fontSize={["16px", "18px"]} opacity={"0.7"}>{description}</Text>
            <Text fontSize={"0.95em"} opacity={"0.5"}>
                Publicado em <time dateTime={publishedAt}>{formatDate(publishedAt)}</time> &middot;
                {updatedAt && ` Atualizado em ${formatDate(updatedAt)}`}
            </Text>
        </Box>
    )
}

const Blog = ({posts}) => {
    const seoTitle = 'Blog | Gabriel Barcelos';
    const seoDesc = 'Eu escrevo sobre negócios, marketing, finanças pessoais e compartilho insights sobre temas diversos.';

    return (
        <Page>
            <NextSeo
                title={seoTitle}
                description={seoDesc}
                openGraph={{
                    title: seoTitle,
                    url: `https://gabrielbarcelos.com.br/blog/`,
                    description: seoDesc,
                    site_name: 'Gabriel Barcelos',
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />
            <PageHeader
                title={"Blog"}
                description={"Eu escrevo sobre negócios, marketing, finanças pessoais e compartilho insights sobre temas diversos."}
            />

            {
                posts
                    ? posts.map((p) => (<BlogListItem key={p.id} {...p}/>))
                    : <Text>Nenhum post encontrado.</Text>
            }
        </Page>
    )
}

export async function getStaticProps(context) {

    let data = await getDatabase(process.env.NOTION_BLOG_DATABASE_ID);

    const published = data.filter(b => b.properties.Status?.select?.name === "Published");

    return {
        props: {
            posts: published,
        },
        revalidate: 1,
    }
}

export default Blog;