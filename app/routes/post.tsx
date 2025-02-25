import { Link, redirect, useFetcher, useNavigate } from 'react-router';
import type { Route } from './+types/post';

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { postId } = params;
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return await res.json();
  } catch (error) {
    return {
      title: 'this is a first post',
      body: 'this is the first post, hhhhh',
    };
  }
}

// export async function loader({ params }: Route.LoaderArgs) {
//   const product = await db.getProduct(params.postId);
//   return product;
// }

export async function ClientAction({ params }: Route.ClientActionArgs) {
  try {
    const { postId } = params;
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    });
    return { isDeleted: true };
  } catch (error) {
    return { isDeleted: false };
  }
}

export default function Post({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isDeleted = fetcher.data?.isDeleted;

  const isDeleting = fetcher.state !== 'idle';

  const { title, body } = loaderData;

  return (
    <div>
      {!isDeleted && (
        <>
          <h1>{title}</h1>
          <p>{body}</p>
        </>
      )}

      <hr />

      <Link to="/ahmed/about">about</Link>

      <button onClick={() => navigate('/')}>home</button>

      <fetcher.Form action="delete">
        <button type="submit">Delete</button>
      </fetcher.Form>

      {isDeleting && <p>deleting ...</p>}
    </div>
  );
}
