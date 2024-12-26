import { SignIn } from "@clerk/nextjs";
import Image from "next/image";


export default function Page() {

    return (
        <section class="bg-white">
        <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section class=" lg:relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
             src={"/signIn.svg"}
             width={700}
              height={700}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
      
            <div className="hidden lg:relative lg:block lg:p-12">
            
              <span className="flex gap-2">
              <h2 class="mt-5 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Fintrack 
              </h2>
              <Image src={'./logo.svg'}
              className="mt-2"
               width={50}
                height={50}
               />
              </span>
             
      
              
            </div>
          </section>
      
          <main
            class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div class="max-w-xl lg:max-w-3xl">
              
              <SignIn/>
            </div>
          </main>
        </div>
      </section>);
}