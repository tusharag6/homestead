import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

const ListingLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={350}
    height={700}
    viewBox="0 0 350 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <Rect x="0" y="322" rx="2" ry="2" width="316" height="11" />
    <Rect x="0" y="343" rx="2" ry="2" width="140" height="10" />
    <Rect x="0" y="60" rx="2" ry="2" width="400" height="248" />
    <Rect x="0" y="362" rx="2" ry="2" width="94" height="10" />
    <Rect x="362" y="322" rx="2" ry="2" width="46" height="10" />
    <Rect x="0" y="676" rx="2" ry="2" width="316" height="11" />
    <Rect x="0" y="697" rx="2" ry="2" width="140" height="10" />
    <Rect x="0" y="414" rx="2" ry="2" width="400" height="248" />
    <Rect x="0" y="716" rx="2" ry="2" width="94" height="10" />
    <Rect x="362" y="676" rx="2" ry="2" width="46" height="10" />
  </ContentLoader>
);

export default ListingLoader;
