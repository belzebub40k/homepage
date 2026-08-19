// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import QueueEntry, { formatTimeLeft } from "./queueEntry";

describe("components/widgets/queue/queueEntry", () => {
  it("renders title and progress width", () => {
    const { container } = render(
      <QueueEntry title="Download" activity="Downloading" timeLeft="1m" progress={42} size="1GB" />,
    );

    expect(screen.getByText("Download")).toBeInTheDocument();
    expect(screen.getByText("1GB - Downloading - 1m")).toBeInTheDocument();

    const bar = container.querySelector("div[style]");
    expect(bar.style.width).toBe("42%");
  });

  it("trims fractional seconds from timeLeft", () => {
    render(<QueueEntry title="Download" activity="Downloading" timeLeft="00:05:23.1234567" progress={42} />);

    expect(screen.getByText("Downloading - 00:05:23")).toBeInTheDocument();
  });

  it("trims fractional seconds from timeLeft", () => {
    render(<QueueEntry title="Download" activity="Downloading" timeLeft="00:05:23.1234567" progress={42} />);

    expect(screen.getByText("Downloading - 00:05:23")).toBeInTheDocument();
  });

  it("humanizes timeLeft when enabled", () => {
    const t = (key, opts) => `${key}:${opts.value}`;

    expect(formatTimeLeft("01:32:07.1234567", true, t)).toBe("common.duration:5527");
    expect(formatTimeLeft("1.02:00:00", true, t)).toBe("common.duration:93600");
    expect(formatTimeLeft("01:32:07.1234567", false, t)).toBe("01:32:07");
  });
});
