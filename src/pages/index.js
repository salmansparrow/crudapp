import Layout from "@/component/layout/Layout";
import TopicList from "@/component/topiclist/TopicList";

function HomePage({ children }) {
  return (
    <>
      <Layout>
        <TopicList />

        {children}
      </Layout>
    </>
  );
}

export default HomePage;
