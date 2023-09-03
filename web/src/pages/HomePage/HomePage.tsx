import { Text } from '@mantine/core'

import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <Text lineClamp={10}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam eius
        debitis illo asperiores ut iusto quae commodi est. Dolores, dolore
        perferendis! Ullam rem, nulla numquam velit nobis repellat, quasi odit
        accusamus architecto doloribus eaque neque est qui pariatur perspiciatis
        beatae inventore ipsum dolores sunt autem laudantium! Temporibus, illum
        nesciunt! Explicabo.
      </Text>
    </>
  )
}

export default HomePage
