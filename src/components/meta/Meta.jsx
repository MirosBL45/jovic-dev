import Head from 'next/head';

function Meta({
  title,
  regular_description,
  regular_keywords,
  og_title,
  og_type,
  og_description,
  og_name,
  property_description,
  property_keywords,
}) {
  return (
    <Head>
      <title>Jovic-devoo</title>
      <meta name="description" content={regular_description} />
      <meta name="keywords" content={regular_keywords} />
      <meta name="author" content="Miroslav Jovic" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={og_title} />
      <meta property="og:type" content={og_type} />
      <meta property="og:description" content={og_description} />
      <meta property="name" content={og_name} />
      <meta property="description" content={property_description} />
      <meta property="keywords" content={property_keywords} />
      {/* <link rel="icon" href="/logoMJ.png" /> */}
      {/* <link rel="shortcut icon" href="/logoMJ.png" type="image/x-icon" /> */}
    </Head>
  );
}

// const titleProba = 'title Proobaa';

Meta.defaultProps = {
  //   title: titleProba,
  //   title: 'Jovic-devoo',
  regular_description:
    'Jovic Miroslav Portfolio WebApp made with NextJS, MongoDB, Mongoose and SWR',
  regular_keywords:
    'HTML, CSS,, SCSS, JavaScript, programming, ReactJS, NextJS, Next, React, MongoDB, Mongoose, SWR, Miroslav Jovic',
  og_title: 'Jovic-dev',
  og_description:
    'Jovic Miroslav Portfolio WebApp made with NextJS, MongoDB, Mongoose and SWR',
  og_name: 'Jovic-dev',
  property_description:
    'Jovic Miroslav Portfolio WebApp made with NextJS, MongoDB, Mongoose and SWR',
  property_keywords:
    'HTML, CSS,, SCSS, JavaScript, programming, ReactJS, NextJS, Next, React, MongoDB, Mongoose, SWR, Miroslav Jovic',
};

export default Meta;
