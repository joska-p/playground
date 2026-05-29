use rand::seq::SliceRandom;
use rand::Rng;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{HtmlInputElement, InputEvent, KeyboardEvent};
use yew::prelude::*;

#[function_component(App)]
fn app() -> Html {
    let input = use_state(|| String::new());
    let lines = use_state(|| {
        vec!["Welcome to the Silly Terminal. Type and press Enter.".to_owned()]
    });

    let oninput = {
        let input = input.clone();
        Callback::from(move |e: InputEvent| {
            let input_el = e.target().unwrap().unchecked_into::<HtmlInputElement>();
            input.set(input_el.value());
        })
    };

    let onkeypress = {
        let input = input.clone();
        let lines = lines.clone();
        Callback::from(move |e: KeyboardEvent| {
            if e.key() == "Enter" {
                let val = (*input).clone().trim().to_string();
                if !val.is_empty() {
                    let mut new_lines = (*lines).clone();
                    new_lines.push(format!("> {}", val));
                    new_lines.push(random_reply(&val));
                    lines.set(new_lines);
                    input.set(String::new());
                }
            }
        })
    };

    html! {
        <div style="font-family:monospace;background:#0b0f13;color:#cfcfcf;padding:16px;width:640px;height:360px;overflow:auto;border-radius:8px;">
            <div>
                { for lines.iter().map(|l| html!{ <div>{ l }</div> }) }
            </div>
            <div style="position:sticky;bottom:0;margin-top:8px;">
                <input
                    value={(*input).clone()}
                    {oninput}
                    {onkeypress}
                    style="width:100%;background:transparent;border:1px solid #333;color:#fff;padding:8px;"
                    placeholder="type here..."
                />
            </div>
        </div>
    }
}

fn random_reply(_input: &str) -> String {
    let mut rng = rand::thread_rng();
    let seeds = [
        "I have no idea what you're talking about.",
        "Beep boop: that sounds suspiciously like a sandwich.",
        "Tell me more about your pet rock.",
        "Error 418: I'm a teapot, but I accept suggestions.",
        "The moon says hi.",
        "That's a very opinionated input.",
    ];
    let pick = seeds.choose(&mut rng).unwrap().to_string();
    format!("{} (id={})", pick, rng.gen::<u32>())
}

#[wasm_bindgen(start)]
pub fn start() {
    yew::Renderer::<App>::new().render();
}
