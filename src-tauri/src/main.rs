// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn hello_world(name: &str, surname: &str) -> String {
    format!(
        "Hello, {} {}! You've been greeted from Rust!",
        name, surname
    )
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![hello_world])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
