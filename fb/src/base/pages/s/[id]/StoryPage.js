'use client';

import { keys } from '@futo-ui/utils'

import { Loading, Logo } from 'core'
import { FixedLayout } from 'core/layouts'
import { ProfileMenuButton } from 'profile'
import { StoreProvider } from 'story/context'
import { Node, StoryContainer } from 'story/core'
import { Text } from 'story/nodes'

const StoryPage = ({ story }) =>
  <FixedLayout toolbarLeft={<Logo />} toolbarRight={<ProfileMenuButton />}>
    { story.profileId ?  
      <StoreProvider value={{ story }}>
        <StoryContainer>
          { keys(story.nodes).map(key => 
            <Node key={key} id={key}>
              <Text id={key} />
            </Node>
          )}
        </StoryContainer>
      </StoreProvider>
      :
      <Loading />
    }
  </FixedLayout>

export default StoryPage; 
