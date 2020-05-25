import React, { useCallback } from "react"
import { FaHeart, FaHeartBroken } from "react-icons/fa"

const space = <span style={{ paddingLeft: "1em" }} />

export function MovieRankLikes() {
  const doLike = useCallback(() => alert("dispatch like"), [])
  const doDislike = useCallback(() => alert("dispatch dislike"), [])

  return (
    <>
      <FaHeart
        style={{ color: "red" }}
        role="button"
        onClick={doLike}
        alt="like"
      />{" "}
      <small data-testid="likes">31</small>
      {space}
      <FaHeartBroken
        style={null}
        role="button"
        onClick={doDislike}
        alt="dislike"
      />{" "}
      <small data-testid="dislikes">6</small>
      {space}
    </>
  )
}
