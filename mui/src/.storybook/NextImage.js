import Image from '../node_modules/next/image';

// 2023-07-21 priority={false} is there because if there wasn't, it was causing this error in storybook:
// TypeError: (0, _reactdom.preload) is not a function. (In '(0, _reactdom.preload)(imgAttributes.src, // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x` opts)', '(0, _reactdom.preload)' is undefined)
// [The above error occurred in the <ImagePreload> component]
//
// It also needs to be after {...props}, obviously
const NextImage = props => <Image {...props} priority={false} unoptimized />

export default NextImage;
