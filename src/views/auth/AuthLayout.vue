<template>
    <section class="p-10 bg-gradient-to-tr from-black/80 to-gray-100 min-h-screen">
        <section class="flex bg-white h-[calc(100vh-90px)] rounded-xl w-[80%] mx-auto">
            <section class="flex flex-col gap-8 w-[44%] pt-20">
                <div class="mx-auto w-44 h-44 bg-no-repeat bg-cover bg-[url(@/assets/logo.png)]"></div>
                <RouterView />
            </section>
            <section class="grow bg-no-repeat bg-cover bg-[url(@/assets/hero.png)] bg-top rounded-r-xl"></section>
        </section>
    </section>
</template>