<script lang="ts">
    import MdiClose from "./lib/icons/MdiClose.svelte";
    import MdiCog from "./lib/icons/MdiCog.svelte";
    import MdiDelete from "./lib/icons/MdiDelete.svelte";
    import MdiDoorOpen from "./lib/icons/MdiDoorOpen.svelte";
    import MdiDotsHorizontal from "./lib/icons/MdiDotsHorizontal.svelte";
    import MdiImageOff from "./lib/icons/MdiImageOff.svelte";
    import MdiKey from "./lib/icons/MdiKey.svelte";
    import MdiLock from "./lib/icons/MdiLock.svelte";
    import type { Identity } from "./proto";
    import { identities, setStage, stage } from "./stores";
    import { bytesToBase64 } from "./utils/helpers";

    // biome-ignore lint/style/useConst: <explanation>
    let modal = false;
    // biome-ignore lint/style/useConst: <explanation>
    let selectedProfile: (Identity & { icon: string }) | null = null;
    // biome-ignore lint/style/useConst: <explanation>
    let consent = false;
</script>

{#if !!modal || !!consent}
    <div class="overlay">
        {#if modal && selectedProfile}
            <div class="modal">
                <div class="modal__header">
                    <span class="modal__title"> Сведения </span>
                    <button
                        class="modal__close"
                        on:click={() => (modal = false)}
                    >
                        <MdiClose size="20px" color="#bbbbbb" />
                    </button>
                </div>
                <div class="modal__data">
                    {#each [{ name: "ID", value: bytesToBase64(selectedProfile.id) }, { name: "Веб-сайт", value: selectedProfile.website.name }, { name: "Имя профиля", value: selectedProfile.user.displayName }, { name: "Ключ", value: bytesToBase64(selectedProfile.publicKey) }] as entry}
                        <div class="data-row">
                            <span class="data-row__name">
                                {entry.name}
                            </span>
                            <span class="data-row__value">
                                {entry.value}
                            </span>
                        </div>
                    {/each}
                </div>
                <div class="modal__footer">
                    <button class="modal__delete">
                        <MdiDelete size="18px" color="#EF4444" />
                        Удалить
                    </button>
                </div>
            </div>
        {/if}
        {#if consent}
            <div class="consent">
                <div class="consent__hero">
                    <span class="consent__title"> Подтвердите действие </span>
                    <span class="consent__description">
                        «webauthn.io» запрашивает создание профиля «kravets»
                    </span>
                </div>
                <button
                    class="consent__agree"
                    on:click={() => (consent = false)}
                >
                    Да, подтвердить
                </button>
                <button
                    class="consent__disagree"
                    on:click={() => (consent = false)}
                >
                    Нет, отказать
                </button>
            </div>
        {/if}
    </div>
{/if}

{#if $stage == "auth"}
    <div class="auth">
        <span class="auth-title"> Авторизация </span>
        <div class="group">
            <span class="group__name">Имя пользователя</span>
            <input
                class="group__input"
                placeholder="Введите имя пользователя"
            />
            <span class="group__name">Пароль</span>
            <input
                class="group__input"
                placeholder="Введите пароль"
                type="password"
            />
        </div>
        <div class="group">
            <button
                class="group__button change-pass"
                on:click={() => setStage("profiles")}
            >
                <MdiKey size="18px" color="#fff" />
                Войти в аккаунт
            </button>
            <button class="group__button exit-account">
                <MdiLock size="18px" color="#0000FF" />
                Создать новый аккаунт
            </button>
        </div>
    </div>
{:else}
    <div class="content">
        {#if $stage == "profiles"}
            {#if $identities.length == 0}
                <span class="no-profile"> Пока что здесь пусто </span>
            {:else}
                {#each $identities as profile}
                    <div class="profile">
                        <img class="h-5 w-5" src={profile.icon} />
                        <!-- <MdiImageOff size="32px" color="#bbbbbb" /> -->
                        <div class="profile__data">
                            <span class="profile__website">
                                {profile.website.name}
                            </span>
                            <span class="profile__party">
                                {profile.user.displayName || profile.user.name}
                            </span>
                        </div>
                        <button
                            class="profile__info"
                            on:click={() => {
                                modal = true;
                                selectedProfile = profile;
                            }}
                        >
                            <MdiDotsHorizontal size="24px" color="#bbbbbb" />
                        </button>
                    </div>
                {/each}
            {/if}
        {:else}
            <div class="group">
                <span class="group__name">Имя пользователя</span>
                <input class="group__input" value="nesclass" disabled />
            </div>
            <div class="group">
                <button class="group__button change-pass">
                    <MdiKey size="18px" color="#fff" />
                    Сменить пароль
                </button>
                <button class="group__button exit-account">
                    <MdiDoorOpen size="18px" color="#0000FF" />
                    Выйти из аккаунта
                </button>
            </div>
        {/if}
    </div>
    <div class="navigation">
        <button
            class="link"
            class:active={$stage == "profiles"}
            on:click={() => setStage("profiles")}
        >
            <MdiLock
                size="20px"
                color={$stage == "profiles" ? "#0000FF" : "#000000"}
            />
            <span class="link__title">Профили</span>
        </button>
        <button
            class="link"
            class:active={$stage == "settings"}
            on:click={() => setStage("settings")}
        >
            <MdiCog
                size="20px"
                color={$stage == "settings" ? "#0000FF" : "#000000"}
            />
            <span class="link__title">Настройки</span>
        </button>
    </div>
{/if}

<style>
    .overlay {
        position: absolute;
        padding: 1rem;

        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        flex-direction: column;

        backdrop-filter: blur(2px);
        background-color: rgba(0, 0, 0, 0.3);
    }

    .no-profile {
        margin: auto 1rem;
        text-align: center;
        color: #808080;
    }

    .auth {
        gap: 1.5rem;
        margin: auto 1rem;

        display: flex;
        flex-direction: column;
    }

    .auth-title {
        font-size: 24px;
        font-weight: 500;
    }

    .group {
        gap: 0.75rem;
        display: flex;
        flex-direction: column;
    }

    .group__input {
        padding: 1rem 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid #bbb;
    }

    .group__button {
        width: 100%;
        gap: 0.5rem;
        padding: 0.5rem;

        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;

        font-weight: 500;
        font-size: 16px;
        border-radius: 0.5rem;
    }

    .change-pass {
        color: #fff;
        margin-top: 1rem;
        background-color: #0000ff;
    }

    .exit-account {
        border: 2px solid #0000ff;
        background-color: #ebebff;
        color: #0000ff;
    }

    .consent {
        width: 100%;
        padding: 1rem;
        margin: auto 0 0;

        gap: 0.5rem;
        display: flex;
        flex-direction: column;

        text-align: center;
        align-items: center;
        justify-content: center;

        overflow: hidden;
        border-radius: 0.75rem;
        box-sizing: border-box;
        background-color: #fff;
    }

    .consent__hero {
        gap: 0.5rem;
        padding: 1rem;

        display: flex;
        flex-direction: column;
    }

    .consent__title {
        font-size: 22px;
        font-weight: 500;
    }

    .consent__description {
        color: #808080;
    }

    .consent__agree,
    .consent__disagree {
        width: 100%;
        padding: 0.75rem;

        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;

        font-weight: 500;
        border-radius: 0.5rem;
    }

    .consent__agree {
        background-color: #0000ff;
        color: #ffffff;
    }

    .consent__disagree {
        border: 2px solid #0000ff;
        background-color: #ebebff;
        color: #0000ff;
    }

    .modal {
        width: 100%;
        margin: auto 0;

        display: flex;
        flex-direction: column;

        overflow: hidden;
        border-radius: 0.75rem;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #bbb;
    }

    .modal__header,
    .modal__footer {
        padding: 1rem;

        display: flex;
        align-items: center;
    }

    .modal__title {
        font-size: 20px;
        font-weight: 500;
    }

    .modal__close {
        padding: 0.5rem;
        margin-left: auto;

        font-size: 14px;
        font-weight: 500;

        border-radius: 0.5rem;
        border: 1px solid #bbb;
    }

    .modal__close:hover {
        background-color: #eee;
    }

    .modal__delete {
        gap: 0.5rem;
        width: 100%;
        padding: 0.5rem 1rem;

        display: flex;
        align-items: center;
        justify-content: center;

        color: #ef4444;
        border-radius: 0.5rem;
        border: 1px solid #ef4444;
    }

    .modal__delete:hover {
        background-color: #f2e4e4;
    }

    .modal__data {
        display: flex;
        flex-direction: column;

        box-sizing: border-box;
        border-top: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
    }

    .data-row {
        gap: 0.5rem;
        padding: 0.75rem 1rem;

        display: flex;
        align-items: center;
    }

    .modal__data > .data-row:nth-child(odd) {
        background-color: #eee;
    }

    .data-row__name {
        flex: 120px 0 0;
        text-align: left;
        font-weight: 500;
        box-sizing: border-box;
    }

    .data-row__value {
        box-sizing: border-box;
    }

    .content {
        flex: 1 0 0;
        overflow: auto;
        padding: 2rem 1rem;

        gap: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .profile {
        gap: 1rem;
        width: 100%;
        padding: 1rem;

        display: flex;
        align-items: center;

        border-radius: 0.75rem;
        border: 1px solid #bbb;
        background-color: #fff;
    }

    .profile__data {
        gap: 0.125rem;
        display: flex;
        flex-direction: column;
    }

    .profile__website {
        font-size: 16px;
    }

    .profile__party {
        font-size: 14px;
        color: #808080;
    }

    .profile__info {
        padding: 0.5rem 0.75rem;
        margin-left: auto;
        border-radius: 0.5rem;
    }

    .profile__info:hover {
        background-color: #eee;
    }

    .navigation {
        flex: 72px 0 0;
        padding: 0 2rem;

        width: 100%;
        display: flex;
        background-color: #fff;

        border-radius: 0.75rem 0.75rem 0 0;
        border-top: 1px solid #bbb;
    }

    .link {
        flex: 1;
        height: 100%;
        gap: 0.125rem;

        display: flex;
        flex-direction: column;

        text-align: center;
        align-items: center;
        justify-content: center;

        outline: none;
        color: #000000;
    }

    .link.active {
        color: #0000ff;
    }

    .link__title {
        font-size: 16px;
    }
</style>
