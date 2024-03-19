// canvasで図形を書くための関数
function createRoundRectPath(posX, posY, width, height, radius){
	/* 角丸四角形のパスを作成 */
	g.beginPath();
    g.moveTo(posX + radius, posY);
    g.lineTo(posX + width - radius, posY);
    g.arc(posX + width - radius, posY + radius, radius, Math.PI * (3/2), 0, false);
    g.lineTo(posX + width, posY + height - radius);
    g.arc(posX + width - radius, posY + height - radius, radius, 0, Math.PI * (1/2), false);
    g.lineTo(posX + radius, posY + height);       
    g.arc(posX + radius, posY + height - radius, radius, Math.PI * (1/2), Math.PI, false);
    g.lineTo(posX, posY + radius);
    g.arc(posX + radius, posY + radius, radius, Math.PI, Math.PI * (3/2), false);
    g.closePath();
}

class TypingObject {
    constructor(d, s, kana) {
        this.d = d;
        this.s = s;
        this.s_kana = [...kana];

        this.kana_last_idx = 0;
        this.typed_alphabets = "";
        this.candidates = this.get_group_candidates(0, this.s_kana);
        this.best_alphabets_candidate = this.get_untyped_best_candidate(this.kana_last_idx, this.candidates, this.s_kana);
        this.is_all_typed = false;
    }

    get_romazi_candidates(a, b, s_kana) {
        let candidates = [];
        if (a + b - 1 >= s_kana.length) return candidates;

        let nex_kana_group = s_kana.slice(a, a + b).join("");
        if (nex_kana_group in this.d) {
            for (let roma_chara of this.d[nex_kana_group]) candidates.push([roma_chara, b]);
        }

        return candidates;
    }

    get_group_candidates(kana_last_idx, s_kana) {
        let row_a = new Set(["あ", "い", "う", "え", "お"]);
        let row_na = new Set(["な", "に", "ぬ", "ね", "の"]);
        let row_ya = new Set(["や", "ゆ", "よ"]);
        let candidates = [];
        if (s_kana[kana_last_idx] === 'っ' && (kana_last_idx + 1) !== s_kana.length && !(row_a.has(s_kana[kana_last_idx + 1]) || row_na.has(s_kana[kana_last_idx + 1]))) {
            let sub_candidates = [];
            for (let j = 2; j > 0; j--) sub_candidates.push(...this.get_romazi_candidates(kana_last_idx + 1, j, s_kana));
            for (let i of sub_candidates) candidates.push([i[0][0] + i[0], i[1] + 1]);
        } else if (s_kana[kana_last_idx] === 'ん' && (kana_last_idx + 1) !== s_kana.length && !(row_a.has(s_kana[kana_last_idx + 1]) || row_na.has(s_kana[kana_last_idx + 1]) || row_ya.has(s_kana[kana_last_idx + 1]))) {
            let sub_candidates = [];
            for (let j = 2; j > 0; j--) sub_candidates.push(...this.get_romazi_candidates(kana_last_idx + 1, j, s_kana));
            for (let i of sub_candidates) candidates.push(['n' + i[0], i[1] + 1]);
        }

        for (let j = 2; j > 0; j--) candidates.push(...this.get_romazi_candidates(kana_last_idx, j, s_kana));

        return candidates;
    }

    get_untyped_best_candidate(kana_last_idx, next_group_candidates, s_kana) {
        let best_untyped_alphabets = "";
        if (next_group_candidates.length > 0) {
            best_untyped_alphabets = next_group_candidates[0][0];
            kana_last_idx += next_group_candidates[0][1];
        }
        while (kana_last_idx < s_kana.length) {
            let best_next_group_candidate = this.get_group_candidates(kana_last_idx, s_kana);
            best_untyped_alphabets += best_next_group_candidate[0][0];
            kana_last_idx += best_next_group_candidate[0][1];
        }

        return best_untyped_alphabets;
    }

    update_typing(input_alphas) {
        for (let input_alpha of input_alphas) {
            if (this.candidates.length === 0) this.candidates = this.get_group_candidates(this.kana_last_idx, this.s_kana);

            let is_typed = false;
            let new_candidates = [];
            for (let i of this.candidates) {
                if (i[0][0] === input_alpha) {
                    if (!is_typed) this.typed_alphabets += input_alpha;
                    is_typed = true;
                    new_candidates.push([i[0].slice(1), i[1]]);
                    if (i[0].length === 1) {
                        this.kana_last_idx += i[1];
                        this.candidates = [];
                        break;
                    }
                }
            }

            if (this.kana_last_idx >= this.s_kana.length) {
                this.is_all_typed = true;
                break;
            }

            if (this.candidates.length !== 0 && is_typed) this.candidates = new_candidates;
            if (!is_typed) {
                console.log("Wrong :(");
                break;
            }
        }

        this.best_alphabets_candidate = this.get_untyped_best_candidate(this.kana_last_idx, this.candidates, this.s_kana);
    }
}