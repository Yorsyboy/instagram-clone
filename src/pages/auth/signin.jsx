import { getProviders, signIn } from "next-auth/react";
import Header from "components/Header";
export default function signin({ providers }) {
  return (
    <>
      <Header />
      <div className="flex justify-center space-x-7 mt-20">
        <img
          className="hidden object-cover rotate-6 md:inline-flex md:w-96"
          src="https://uploads-ssl.webflow.com/628b1c3025b0da2dab9e614a/62f9eb7a269706f747dbabee_WebsiteSecurity2.png"
          alt="logo"
        />
        <div className="flex flex-col ">
          <div className="flex flex-col items-center">
            <img
              className="w-32 object-cover"
              src="https://i0.wp.com/cdn.pixabay.com/photo/2016/11/18/11/16/social-1834010__340.png?resize=329%2C329&ssl=1"
              alt="logo"
            />
            <p className="text-sm italic my-10 text-center">
              Instagram clone made by{" "}
              <a
                className="bg-gray-300 rounded-lg p-1"
                href="https://github.com/Yorsyboy"
                target="_blank"
              >
                Toyosi Taiwo{" "}
              </a>
               for learning purpose
            </p>
          </div>
          <div className="flex flex-wrap">
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="">
                <button
                  className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500 m-1"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

//server side rendering
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
