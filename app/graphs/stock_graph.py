import matplotlib.pyplot as plt
import base64
from io import BytesIO


class StockGraphGenerator:

    def generate_price_graph(
        self,
        history_data,
        color="blue",
    ):

        if not history_data:
            return None

        prices = history_data.get("c", [])

        if not prices:
            return None

        x = list(range(len(prices)))
        y = prices

        # color mapping
        color_map = {
            "green": "#00ff88",
            "red": "#ff4d4d",
            "blue": "#4da6ff",
        }

        graph_color = color_map.get(
            color,
            "#4da6ff",
        )

        plt.figure(figsize=(8, 4))

        plt.plot(
            x,
            y,
            color=graph_color,
            linewidth=2,
        )

        plt.fill_between(
            x,
            y,
            color=graph_color,
            alpha=0.3,
        )

        plt.title(
            "Price History",
            color="white",
        )

        plt.grid(True, alpha=0.3)

        plt.gca().set_facecolor("#111111")

        plt.gcf().patch.set_facecolor("#111111")

        buf = BytesIO()

        plt.savefig(
            buf,
            format="png",
            bbox_inches="tight",
        )

        buf.seek(0)

        img = base64.b64encode(
            buf.read()
        ).decode("utf-8")

        plt.close()

        return img