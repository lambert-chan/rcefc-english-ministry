const API_URL = "https://english.rcefc.org/graphql";

async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { "Content-Type": "application/json" };

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  // error handling work
  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getAllPosts() {
  const data = await fetchAPI(
    `
      query First10Posts {
        posts(first: 10, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              id
              date
              title
              slug
              extraPostInfo {
                authorExcerpt
              }
            }
          }
        }
      }
      
      `
  );

  return data?.posts;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `
      query allPostsWithSlug {
        posts(first: 10, where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  );
  return data?.posts;
}

/**
 * Get a single post from wp
 * @param {} slug
 */
export async function getPost(slug) {
  const data = await fetchAPI(
    `
      fragment PostFields on Post {
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ...PostFields
          content
        }
      }
    `,
    {
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }
  );

  return data;
}

/**
 * Get a single page from wp based on uri slug eg. about or /about/purpose-statement
 * @param {} page
 */
export async function getPage(page) {
  const data = await fetchAPI(
    `
     query PageBySlug($id: ID!) {
       page(id: $id, idType: URI) {
         title
         uri
         slug
         content
         children (where: {orderby: {field: MENU_ORDER, order: ASC}}){
          edges {
            node {
              uri
              ... on Page {
                id
                content(format: RENDERED)
                title
              }
              slug
            }
          }
        }
       }
     }
   `,
    {
      variables: {
        id: page,
      },
    }
  );

  return data;
}

/**
 * Get first 25 menu items from the primary menu
 */
export async function getAllMenuItems() {
  const data = await fetchAPI(
    `
    query MENU_ITEMS {
      menuItems(first: 25, where: {location: PRIMARY}) {
        nodes {
          id
          parentId
          path
          label
        }
      }
    }
    `
  );

  return data?.menuItems.nodes;
}

/**
 * Get all events
 */
export async function getAllEvents() {
  const currentYear = new Date().getFullYear();
  const data = await fetchAPI(
    `
      query GetEvents {
        events(
          where: {startDateQuery: {after: {year: ${currentYear}}}, orderby: {field: DATE, order: ASC}}
          first: 150
        ) {
          nodes {
            startDate
            title
            excerpt
            endDate
          }
        }
      }
    `
  );

  return data?.events;
}
